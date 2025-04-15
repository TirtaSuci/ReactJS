import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AppShell from "../../../src/pages/componens/layouts/appshell";
import * as nextRouter from "next/router";
import { NextRouter } from "next/router";

// ✅ 1. Mock dynamic() to return actual mocked component
jest.mock("next/dynamic", () => () => (props: any) => {
    const MockNavbar = require("../../../src/pages/componens/layouts/navbar").default;
    return <MockNavbar {...props} />;
});

// ✅ 2. Mock Navbar component
jest.mock("../../../src/pages/componens/layouts/navbar", () => ({
    __esModule: true,
    default: () => <div data-testid="mock-navbar">Mock Navbar</div>,
}));


describe("AppShell Component", () => {
    const useRouterMock = jest.spyOn(nextRouter, "useRouter");

    const createMockRouter = (pathname: string): Partial<NextRouter> => ({
        pathname,
        route: "",
        query: {},
        asPath: pathname,
        basePath: "",
        isLocaleDomain: false,
        isReady: true,
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render navbar on '/' path", () => {
        useRouterMock.mockReturnValue(createMockRouter("/") as NextRouter);

        render(
            <AppShell>
                <div>Test Child</div>
            </AppShell>
        );

        expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
        expect(screen.getByText("Test Child")).toBeInTheDocument();
    });

    it("should not render navbar on '/auth/login'", () => {
        useRouterMock.mockReturnValue(createMockRouter("/auth/login") as NextRouter);

        render(
            <AppShell>
                <div>Login Page</div>
            </AppShell>
        );

        expect(screen.queryByTestId("mock-navbar")).not.toBeInTheDocument();
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("should show correct navbar for '/product/[product]'", () => {
        useRouterMock.mockReturnValue(createMockRouter("/product/[product]") as NextRouter);

        render(
            <AppShell>
                <div>Product Detail Page</div>
            </AppShell>
        );

        expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
        expect(screen.getByText("Product Detail Page")).toBeInTheDocument();
    });
});
