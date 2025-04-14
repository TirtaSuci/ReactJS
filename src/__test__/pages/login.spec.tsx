import LoginPage from "@/pages/auth/login";
import { render, screen } from "@testing-library/react";

jest.mock('next/router', () => ({
    useRouter: () => ({
        route: '/auth/login',
        pathname: '/',
        query: {},
        asPath: '/',
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

describe("Login Page", () => {
    it("should render correctly", () => {
        const page = render(<LoginPage />);
        expect(page).toMatchSnapshot()
    })
})
