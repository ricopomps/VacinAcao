import { getWeekSchedules, check, getCurrentWeek } from "./publicUtils";

describe("Teste utils", () => {
  it("Deve retornar 7 dias", async () => {
    const response = await getCurrentWeek(0);
    expect(response.length).toBe(7);
  });
});
