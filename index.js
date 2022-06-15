import express from 'express';
import cors from 'cors';

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

const app = express();
app.use(cors());

app.get('/holidays', (req, res) => {
    res.send(holidays);
});

app.get('/is-today-holiday', (req, res) => {
    res.send(isHoliday());
});

app.get('/holidays/:month', (req, res) => {
    const mes = req.params.month;
    res.send(holidaysOfMonth(mes));
});

function holidaysOfMonth(mes) {
    const holidaysMonth = [];
    for (let i = 0; i < holidays.length; i++) {
        let newDate = new Date(holidays[i].date);
        if (newDate.getMonth() + 1 === parseInt(mes)) {
            holidaysMonth.push(holidays[i]);
        }
    }
    if (holidaysMonth.length === 0) {
        return `Não tem feriados no mês ${mes}! :(`;
    }
    return holidaysMonth;
}

function isHoliday() {
    const hoje = new Date().toLocaleDateString();

    const feriado = holidays.find(d => d.date === hoje);

    if (feriado) {
        return `Sim, hoje é ${feriado.name}`;
    } else {
        return `Não, hoje não é feriado`;
    }
}

app.listen(5000);