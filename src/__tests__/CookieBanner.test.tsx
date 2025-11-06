import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import Cookies from "js-cookie";
import { CookieBanner } from "@/app/components/cookie-banner/CookieBanner";

vi.mock("js-cookie", () => ({
    default: {
        set: vi.fn(),
    },
}));

describe("CookieBanner", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders banner with text and buttons", () => {
        render(<CookieBanner />);

        const text = screen.queryByTestId("cookie-text");
        const acceptBtn = screen.queryByTestId("cookie-btn-accept");
        const rejectBtn = screen.queryByTestId("cookie-btn-reject");

        expect(text).toBeInTheDocument();
        expect(acceptBtn).toBeInTheDocument();
        expect(rejectBtn).toBeInTheDocument();
    });

    it("sets cookie and hides banner when Accept is clicked", () => {
        render(<CookieBanner />);

        const acceptBtn = screen.queryByTestId("cookie-btn-accept");
        if(acceptBtn) {
            fireEvent.click(acceptBtn);
        }

        expect(Cookies.set).toHaveBeenCalledWith("cookiesAccepted", "true", {
            expires: 365,
        });

        // banner should now be hidden
        const text = screen.queryByTestId("cookie-text");
        expect(text).not.toBeInTheDocument();
    });

    it("hides banner without setting cookie when Reject is clicked", () => {
        render(<CookieBanner />);

        const rejectBtn = screen.queryByTestId("cookie-btn-reject");
        if(rejectBtn) {
            fireEvent.click(rejectBtn);
        }

        expect(Cookies.set).not.toHaveBeenCalled();

        const text = screen.queryByTestId("cookie-text");
        expect(text).not.toBeInTheDocument();
    });
});
