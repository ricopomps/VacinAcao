import Pagination from "./Pagination";

import { render } from "@testing-library/react";

describe("Pagination", () => {
  it("Renderiza Pagination", () => {
    render(<Pagination />);
  });
});
