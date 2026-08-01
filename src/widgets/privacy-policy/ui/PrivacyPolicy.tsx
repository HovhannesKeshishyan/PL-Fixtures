import styles from "./PrivacyPolicy.module.scss";

export const PrivacyPolicy = () => {
    return (
        <main className={styles.privacyPolicy}>
            <h1>Privacy Policy</h1>

            <div className={styles.sectionName}>
                <p><em>Last updated: <strong>01/august/2026</strong></em></p>

                <p>This Privacy Policy explains what data Premier League Fixtures (&#34;we&#34;, &#34;us&#34;) collects
                    when
                    you visit <a
                        href="https://premierleague-fixtures.vercel.app/">premierleague-fixtures.vercel.app</a>, and how
                    it
                    is
                    used.</p>
            </div>

            <div className={styles.sectionName}>
                <h2>1. Cookies</h2>

                <p>We use cookies on this website to remember your preferences and improve your experience:</p>

                <ul>
                    <li><strong>selectedTeams</strong> — remembers which football teams you&#39;ve selected, so we can
                        show you
                        their fixtures
                    </li>
                    <li><strong>limit</strong> — remembers how many fixtures you prefer to see at once</li>
                </ul>

                <p>These cookies are strictly functional: they do not track you across other websites, are not used for
                    advertising or analytics, and do not collect personal data. Because they are necessary for the site
                    to
                    remember your preferences, they do not require your consent under applicable cookie laws, but we
                    disclose them here for transparency.</p>

                <p>You can delete these cookies at any time through your browser settings. Doing so will simply reset
                    your
                    preferences to default on your next visit.</p>
            </div>

            <div className={styles.sectionName}>
                <h2>2. Error Monitoring</h2>

                <p>To keep this website working reliably, we use an automated error monitoring tool that detects and
                    logs
                    technical errors when they occur.</p>

                <p>When an error happens, this tool may automatically collect technical information, such as:</p>

                <ul>
                    <li>Your IP address</li>
                    <li>Browser and device information</li>
                    <li>The page you were on and the actions that led to the error</li>
                    <li>Error messages and technical logs</li>
                </ul>

                <p><strong>Why we collect this:</strong> This information helps us identify, diagnose, and fix bugs, and
                    keep the website secure and reliable. Our legal basis for this is our legitimate interest in
                    operating a
                    functional website.</p>

                <p><strong>Third-party processing:</strong> This data may be processed by a third-party service on our
                    behalf, solely for the purpose of error monitoring.</p>

                <p><strong>Not collected via cookies:</strong> This information is not collected through a cookie — it
                    is
                    sent automatically when a technical error occurs on the page you&#39;re viewing.</p>
            </div>

            <div className={styles.sectionName}>
                <h2>3. Your Rights</h2>

                <p>Depending on your location, you may have the right to:</p>

                <ul>
                    <li>Request access to the personal data we hold about you</li>
                    <li>Request correction or deletion of your data</li>
                    <li>Object to or restrict certain processing</li>
                    <li>Lodge a complaint with a data protection authority</li>
                </ul>

                <p>To exercise these rights, contact us via <strong>LinkedIn</strong> or <strong>GitHub</strong>.</p>
            </div>

            <div className={styles.sectionName}>
                <h2>4. Changes to This Policy</h2>

                <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an
                    updated
                    &#34;Last updated&#34; date.</p>
            </div>

            <div className={styles.sectionName}>
                <h2>5. Contact</h2>

                <p>If you have questions about this Privacy Policy, contact us
                    via <strong>LinkedIn</strong> or <strong>GitHub</strong>.</p>
            </div>
        </main>
    );
}