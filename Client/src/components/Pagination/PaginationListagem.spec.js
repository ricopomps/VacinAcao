import PaginationListagem from "./PaginationListagem";

import { render } from "@testing-library/react";

describe("PaginationListagem", () => {
  it("Renderiza PaginationListagem", () => {
    render(<PaginationListagem />);
  });
});
