// ✅ Must be at the very top of the file, BEFORE importing RegisterPage
jest.mock("next/router", () => ({
    useRouter: () => ({
        route: "/auth/register",
        pathname: "/",
        query: {},
        asPath: "/auth/register",
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn().mockResolvedValue(undefined),
        isFallback: false,
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
    }),
}));

// Only now do you import the component that uses useRouter
import RegisterPage from "@/pages/auth/register";
import { render, screen } from "@testing-library/react";

describe("Register Page", () => {
    it("should render correctly", () => {
        const { asFragment } = render(<RegisterPage />);
        expect(asFragment()).toMatchSnapshot();
    });
});
