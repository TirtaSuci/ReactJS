import { SessionProvider } from "next-auth/react";
import Navbar from "@/pages/componens/layouts/navbar";
import { render } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/src/pages/componens/layouts/navbar",
    push: jest.fn(),
  }),
}));

describe("Navbar Component", () => {
  it("should render correctly", () => {
    const title = "Mock Title";
    const link = "/mock";

    const { asFragment } = render(
      <SessionProvider session={null}>
        <Navbar title={title} link={link} />
      </SessionProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
