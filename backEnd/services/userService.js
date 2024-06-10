class UserService {
    constructor() {
        this.users = new Map();
    }
// Phương thức để đánh giá người dùng (tài xế hoặc hành khách)
    rateUser(userId, rating) {
        try {
            // Lấy thông tin người dùng từ bộ nhớ
            const user = this.users.get(userId);
            if (user) {
                // Cập nhật xếp hạng của người dùng
                user.rating = rating;
                console.log(`Người dùng ${userId} đã được đánh giá với xếp hạng: ${rating}`);
            } else {
                throw new Error(`Không tìm thấy người dùng với ID: ${userId}`);
            }
        } catch (error) {
            console.error('Lỗi khi đánh giá người dùng:', error);
            throw new Error('Không thể đánh giá người dùng');
        }
    }
}

module.exports = new UserService();
