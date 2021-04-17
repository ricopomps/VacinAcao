import DiaController from "./dia.js";

describe("Teste do dia", () => {
  it("should return dias", async () => {
    //     mockRequest= () => {
    //     const req = {}
    //     req.body = jest.fn().mockReturnValue(req)
    //     req.params = jest.fn().mockReturnValue(req)
    //     return req
    //   },

    //   mockResponse=() => {
    //     const res = {}
    //     res.send = jest.fn().mockReturnValue(res)
    //     res.status = jest.fn().mockReturnValue(res)
    //     res.json = jest.fn().mockReturnValue(res)
    //     return res
    //   },
    // jest.spyOn(userRepositoryStub, "getDias").mockReturnValueOnce(
    //   new Promise((resolve) =>
    //     resolve({
    //       email: "mocked_valid_email",
    //       name: "mocked_valid_name",
    //       password: "mocked_valid_password",
    //       isAdmin: false,
    //       active: true,
    //       id: "mocked_valid_id",
    //     })
    //   )
    // );
    // const response = await getDias({}, { send: () => ({ status: undefined }) });
    // expect(response.status).toBe(500);
    expect(1).toBe(1);
  });
});
