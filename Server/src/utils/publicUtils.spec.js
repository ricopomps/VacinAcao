import { getWeekSchedules, check, getCurrentWeek } from "./publicUtils";
import moment from "moment";

describe("Teste utils", () => {
  it("Deve retornar 7 dias", () => {
    for (let i = 0; i < 10; i++) {
      const response = getCurrentWeek(i);
      expect(response.length).toBe(7);
    }
  });
  it("Primeiro dia ser domingo e ultimo dia ser sabado e ter o dia da semana atual", () => {
    const week = getCurrentWeek(0);

    expect(week[0].show).toBe(
      `Domingo - ${moment().startOf("week").format("DD/MM")}`
    );
    expect(week[6].show).toBe(
      `Sábado - ${moment().endOf("week").format("DD/MM")}`
    );
  });
  it("Dia passado retorna danger", () => {
    const response = check("08:00 - 08:30", {
      day: moment().subtract(1, "days").format("DD/MM/yyyy"),
      schedules: [],
    });
    expect(response).toBe("danger");
  });
});
