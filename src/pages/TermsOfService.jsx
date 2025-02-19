import { Meta } from '../components';

const TermsOfService = () => {
    return (
        <>
            <Meta
                title="Terms of Service"
                description="Terms of Service for Hoang Huy Duc's portfolio website"
                keywords="terms of service, legal, conditions, terms of use"
            />
            <section className="w-full px-4 py-8 sm:px-6 lg:px-8 pt-10">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
                    
                    <div className="space-y-6 text-gray-600">
                        <section>
                            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
                            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Hoang Huy Duc's website for personal, non-commercial transitory viewing only.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
                            <p>The materials on Hoang Huy Duc's website are provided on an 'as is' basis. Hoang Huy Duc makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">4. Limitations</h2>
                            <p>In no event shall Hoang Huy Duc or his suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Hoang Huy Duc's website.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">5. Revisions and Errata</h2>
                            <p>The materials appearing on Hoang Huy Duc's website could include technical, typographical, or photographic errors. Hoang Huy Duc does not warrant that any of the materials on its website are accurate, complete or current.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">6. Links</h2>
                            <p>Hoang Huy Duc has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Hoang Huy Duc of the site.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">7. Contact Information</h2>
                            <p>If you have any questions about these Terms of Service, please contact me through the contact form on this website.</p>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsOfService;