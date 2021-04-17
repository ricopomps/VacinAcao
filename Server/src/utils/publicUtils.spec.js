import { getWeekSchedules, check, getCurrentWeek } from "./publicUtils";
import moment from "moment";

describe("Teste getCurrentWeek", () => {
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
});

describe("Teste check", () => {
  it("Dia passado retorna danger", () => {
    const response = check("08:00 - 08:30", {
      day: moment().subtract(1, "days").format("DD/MM/yyyy"),
      schedules: [],
    });
    expect(response).toBe("danger");
  });
  it("Dia futuro sem marcações retorna success", () => {
    const response = check("08:00 - 08:30", {
      day: moment().add(1, "days").format("DD/MM/yyyy"),
      schedules: [],
    });
    expect(response).toBe("success");
  });
  it("Dia futuro com marcações e não idosos retorna primary", () => {
    const response = check("08:00 - 08:30", {
      day: moment().add(1, "days").format("DD/MM/yyyy"),
      schedules: [
        {
          schedule: "08:00 - 08:30",
          pacientAge: moment().format("DD/MM/yyyy"),
        },
        {
          schedule: "08:00 - 08:30",
          pacientAge: moment().format("DD/MM/yyyy"),
        },
      ],
    });
    expect(response).toBe("primary");
  });
  it("Dia futuro com marcações e idosos retorna danger", () => {
    const response = check("08:00 - 08:30", {
      day: moment().add(1, "days").format("DD/MM/yyyy"),
      schedules: [
        {
          schedule: "08:00 - 08:30",
          pacientAge: moment().subtract(60, "years").format("DD/MM/yyyy"),
        },
        {
          schedule: "08:00 - 08:30",
          pacientAge: moment().subtract(60, "years").format("DD/MM/yyyy"),
        },
      ],
    });
    expect(response).toBe("danger");
  });
});
