// Message Type: GET_SPIN
const GET_SPIN = (point, total, startDate, endDate) => {
    return `Kính gửi Quý Khách Hàng [FULLNAME]\n
Chúc mừng Quý Khách đã nhận được ${point} lượt quay số may mắn từ chương trình “Happy Friday” triển khai từ ngày ${startDate} đến ngày ${endDate}.\n
Tổng lượt quay Quý Khách đang sở hữu: ${total}\n
Ngàn ly cà phê, trà sữa, trà đào,… từ Highland và Phúc Long đang đợi Bạn thưởng thức. Quay ngay!`;
};

// Message Type: REMIND_SPIN
const REMIND_SPIN = (total, startDate, endDate) => {
    return `Kính gửi Quý Khách Hàng [FULLNAME]\
Quý Khách đang có ${total} lượt quay số may mắn từ chương trình “Happy Friday” triển khai từ ngày ${startDate} đến ngày ${endDate}.\n
Ngàn ly cà phê, trà sữa, trà đào,… từ Highland và Phúc Long đang đợi Bạn thưởng thức. Quay ngay!`;
};

// Message Type: CLAIM_REWARD
const CLAIM_REWARD = (startDate, endDate) => {
    return `Kính gửi Quý Khách Hàng [FULLNAME]\n
Chúc mừng quý khách đã trúng thưởng chương trình khuyến mại “Happy Friday” diễn ra từ ngày ${startDate} đến ngày ${endDate}.\n
Hướng dẫn sử dụng: Mã quà tặng đã được gửi trực tiếp vào tài khoản của khách hàng. Chọn “Quà của tôi” của Vòng quay Happy Friday trong tính năng “Khách hàng thân thiết” trên App HDBank để sử dụng.\n
Cảm ơn Quý Khách!`;
};

// Message Type: SKYPOINT_BALANCE
const SKYPOINT_BALANCE = (dateTime, point, total, extraInfo) => {
    let transactionType = '';
    switch (extraInfo) {
        case '1':
            transactionType = 'Tích điểm HDBank Loyalty';
            break;
        case '2':
            transactionType = 'Đổi điểm SkyPoint';
            break;
        case '3':
            transactionType = 'Nhận thưởng chương trình khuyến mại';
            break;
    }

    return `${dateTime}\n
THÔNG BÁO BIẾN ĐỘNG SỐ ĐIỂM SKYPOINT\n
${point}\n
Số điểm khả dụng: ${total}\n
Loại giao dịch: ${transactionType}`;
};

module.exports = {
    GET_SPIN,
    REMIND_SPIN,
    CLAIM_REWARD,
    SKYPOINT_BALANCE
};