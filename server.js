const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 데이터 저장소
const dataStore = {
    koreaFood: [],
    koreaPlace: [],
    japanFood: [],
    japanPlace: []
};

// 아이템 추가 API
app.post('/add', (req, res) => {
    const { category, value } = req.body;
    if (category && value) {
        dataStore[category].push(value);
        return res.json({ success: true, data: dataStore[category] });
    }
    res.status(400).json({ success: false, message: 'Invalid data' });
});

// 아이템 삭제 API
app.post('/delete', (req, res) => {
    const { category, index } = req.body;
    if (category && index >= 0 && index < dataStore[category].length) {
        dataStore[category].splice(index, 1);
        return res.json({ success: true, data: dataStore[category] });
    }
    res.status(400).json({ success: false, message: 'Invalid data' });
});

// 데이터 조회 API
app.get('/data', (req, res) => {
    res.json(dataStore);
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
