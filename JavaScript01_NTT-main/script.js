const SUBJECTS = [
    "Giải tích 1",
    "Đại số tuyến tính",
    "Xác suất thống kê",
    "Tin học đại cương",
    "Xây dựng ứng dụng Web"
];

// Tính điểm trung bình từ mảng điểm
function calculateAverage(scores) {
    const sum = scores.reduce((total, s) => total + s, 0);
    return sum / scores.length;
}

// Xếp loại học tập theo điểm trung bình
function classify(avg) {
    if (avg >= 8.0) return "Giỏi";
    if (avg >= 6.5) return "Khá";
    if (avg >= 5.0) return "Trung bình";
    return "Yếu";
}

const RANK_CLASS = {
    "Giỏi": "rank-gioi",
    "Khá": "rank-kha",
    "Trung bình": "rank-tb",
    "Yếu": "rank-yeu"
};

function setError(inputId, message) {
    const input = document.getElementById(inputId);
    document.getElementById("err-" + inputId).textContent = message;
    input.classList.toggle("invalid", message !== "");
}

// Kiểm tra dữ liệu; trả về true nếu hợp lệ
function validate() {
    let ok = true;

    const name = document.getElementById("name").value.trim();
    if (name === "") {
        setError("name", "Vui lòng nhập tên sinh viên.");
        ok = false;
    } else {
        setError("name", "");
    }

    SUBJECTS.forEach((_, i) => {
        const id = "s" + i;
        const raw = document.getElementById(id).value.trim();
        const value = Number(raw);
        if (raw === "") {
            setError(id, "Không được để trống.");
            ok = false;
        } else if (isNaN(value) || value < 0 || value > 10) {
            setError(id, "Điểm phải từ 0 đến 10.");
            ok = false;
        } else {
            setError(id, "");
        }
    });

    return ok;
}

function showResult() {
    const name = document.getElementById("name").value.trim();
    const scores = SUBJECTS.map((_, i) => Number(document.getElementById("s" + i).value));

    const avg = calculateAverage(scores);
    const rank = classify(avg);

    document.getElementById("resName").textContent = "Sinh viên: " + name;

    document.getElementById("resBody").innerHTML = SUBJECTS
        .map((subject, i) => `<tr><td>${subject}</td><td>${scores[i]}</td></tr>`)
        .join("");

    document.getElementById("resAvg").textContent = avg.toFixed(2);

    const rankCell = document.getElementById("resRank");
    rankCell.textContent = rank;
    rankCell.className = RANK_CLASS[rank];

    document.getElementById("result").hidden = false;
}

document.getElementById("scoreForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (validate()) {
        showResult();
    } else {
        document.getElementById("result").hidden = true;
    }
});
