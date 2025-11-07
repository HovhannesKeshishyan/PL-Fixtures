import {render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom";

import {Header} from "@/app/components/header/Header";

describe("Header", () => {
    it("should render the component with the correct heading text", () => {
        render(<Header/>);

        // 1. Verify the main heading text is present (using role for accessibility)
        const headingElement = screen.getByRole("heading", {name: "Premier League Fixtures"});
        expect(headingElement).toBeInTheDocument();

        // 2. Verify the heading level (it should be an H1)
        expect(headingElement.tagName).toBe("H1");
    });
});