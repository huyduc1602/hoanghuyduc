import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const API_KEY = import.meta.env.VITE_API_KEY;

// Function to convert Google Drive URL to direct image URL
const convertToDirectImageUrl = (driveUrl) => {
    // Extract file ID from different Drive URL formats
    let fileId;

    // Check for /d/ format
    const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    // Check for ?id= format
    const idParamMatch = driveUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);

    if (fileIdMatch) {
        fileId = fileIdMatch[1];
    } else if (idParamMatch) {
        fileId = idParamMatch[1];
    } else {
        return '';
    }

    // Return the direct image URL format
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
};


export async function getProjectsData() {
    try {
        console.log('Attempting to access spreadsheet:', SPREADSHEET_ID);

        // Link: https://docs.google.com/spreadsheets/d/1c3jRHA--1quuq_BjlKwDm5qt8JwDuB-HfiVEZg-7Fj0/edit?gid=393259790#gid=393259790
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID, {
            apiKey: API_KEY
        });

        await doc.loadInfo();
        console.log('Spreadsheet title:', doc.title);

        // Get all sheets
        const sheets = doc.sheetsByIndex;
        console.log('Available sheets:', sheets.map(sheet => ({
            id: sheet.sheetId,
            title: sheet.title
        })));

        if (sheets.length < 2) {
            throw new Error('Spreadsheet must have at least 2 sheets');
        }

        // Get categories from the first sheet
        const categoriesSheet = sheets[0];
        await categoriesSheet.loadHeaderRow();
        const categoryRows = await categoriesSheet.getCellsInRange('A2:A100');

        // Initialize projects object dynamically based on categories
        const projects = {};
        categoryRows?.forEach(([category]) => {
            if (category) {
                projects[category.toLowerCase()] = [];
            }
        });

        // Get projects from the second sheet
        const projectsSheet = sheets[1];
        await projectsSheet.loadHeaderRow();
        const projectRows = await projectsSheet.getRows();

        projectRows.forEach(row => {
            try {
                const imagesUrls = (row.get('images') || '')
                    .split(',')
                    .map(url => url.trim())
                    .filter(Boolean)
                    .map(convertToDirectImageUrl);

                const project = {
                    id: parseInt(row.get('id') || '0'),
                    title: row.get('title') || '',
                    description: row.get('description') || '',
                    link: row.get('link') || '',
                    images: imagesUrls,
                    type: (row.get('type') || '').toLowerCase()
                };

                if (project.type && projects[project.type]) {
                    projects[project.type].push(project);
                }
            } catch (rowError) {
                console.warn('Error processing row:', rowError);
                console.warn('Problematic row:', row);
            }
        });

        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data
        });
        return null;
    }
}