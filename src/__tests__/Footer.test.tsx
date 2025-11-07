import {render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom";

import {Footer, socialLinks} from "@/app/components/footer/Footer";

describe("Footer", () => {
    it("should render the Contacts heading", () => {
        render(<Footer/>);
        expect(screen.getByRole("heading", {name: /contacts/i})).toBeInTheDocument();
    });

    it("should render the current year in the copyright notice", () => {
        const currentYear = new Date().getFullYear().toString();
        render(<Footer/>);

        const copyrightText = screen.getByText(new RegExp(`© ${currentYear}`));
        expect(copyrightText).toBeInTheDocument();

        // Ensure it's rendered within a span (based on component structure)
        expect(copyrightText.tagName).toBe("SPAN");
    });

    it("should render all social media links with correct attributes and icons", () => {
        render(<Footer/>);

        // Check for the list of links
        const socialList = screen.getByRole("list");
        expect(socialList).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(socialLinks.length);

        // Iterate through expected data to check each link individually
        socialLinks.forEach(item => {
            // 1. Check the <a> element (link)
            const linkElement = screen.getByRole("link", {name: `${item.name} link`});
            expect(linkElement).toBeInTheDocument();

            // 2. Check the href attribute
            expect(linkElement).toHaveAttribute("href", item.href);

            // 3. Check security attributes
            expect(linkElement).toHaveAttribute("target", "_blank");
            // The component uses rel="noreferer, noopener" which is correctly checked below:
            expect(linkElement).toHaveAttribute("rel", "noreferer, noopener");
        });
    });
});