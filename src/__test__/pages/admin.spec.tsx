import AdminPage from "@/pages/admin";
import { render, screen } from "@testing-library/react";

describe("Admin Page", () => {
    it("should render correctly", () => {
        const page = render(<AdminPage />);
        expect(page).toMatchSnapshot()
    })
})
