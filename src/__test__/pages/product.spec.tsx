import ProductPage from "@/pages/product";
import { render, screen } from "@testing-library/react";

jest.mock('next/router', () => ({
    useRouter: () => ({
        route: '/product',
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

describe("Product Page", () => {
    it("should render correctly", () => {
        const page = render(<ProductPage />);
        expect(page).toMatchSnapshot()
    })
})
