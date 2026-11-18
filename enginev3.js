/**
 * CROOKED MAP ENGINE v3.0 — VINTAGE PARCHMENT & INTERACTIVE SVG EDITION
 * Tích hợp sẵn bản vẽ mặt bằng 5 tầng (B1 - F4), Kéo/Thu phóng (+/-/Reset),
 * Tự động làm mờ + khóa 🔒 (unlockedRooms) & Ẩn mật đạo (unlockedSecrets).
 */

(function (global) {
  "use strict";

  // 1. CHUẨN HÓA ID PHÒNG (Chống lệch ID khi AI tự sinh)
  const ALIAS_MAP = {
    "b1_stairs": "b1_stairs", "b1_corridor": "b1_stairs", "b1_pipe_corridor": "b1_stairs",
    "b1_cellar": "b1_cellar", "b1_wine_cellar": "b1_cellar", "b1_wine": "b1_cellar",
    "b1_pantry": "b1_pantry", "b1_food_pantry": "b1_pantry", "b1_storage": "b1_pantry",
    "b1_boiler": "b1_boiler", "b1_generator": "b1_boiler", "b1_boiler_room": "b1_boiler",

    "f1_exterior": "f1_maze", "f1_maze": "f1_maze", "f1_garden": "f1_maze",
    "f1_grand_hall": "f1_grand_hall", "f1_hall": "f1_grand_hall", "f1_lobby": "f1_grand_hall",
    "f1_living": "f1_living", "f1_living_room": "f1_living", "f1_main_living": "f1_living",
    "f1_lib_west": "f1_lib_west", "f1_west_library": "f1_lib_west", "f1_library_west": "f1_lib_west",
    "f1_lib_east": "f1_lib_east", "f1_east_library": "f1_lib_east", "f1_library_east": "f1_lib_east", "f1_library": "f1_lib_east",
    "f1_secret": "f1_secret", "f1_secret_room": "f1_secret",
    "f1_dining": "f1_dining", "f1_dining_room": "f1_dining",
    "f1_kitchen": "f1_kitchen",
    "f1_ballroom": "f1_ballroom", "f1_dance_hall": "f1_ballroom",
    "f1_stage": "f1_stage", "f1_main_stage": "f1_stage",
    "f1_pool": "f1_pool", "f1_indoor_pool": "f1_pool",
    "f1_stairs_left": "f1_stairs_left", "f1_left_stairs": "f1_stairs_left",
    "f1_stairs_right": "f1_stairs_right", "f1_right_stairs": "f1_stairs_right",

    "f2_hallway": "f2_hallway", "f2_corridor": "f2_hallway", "f2_long_hallway": "f2_hallway",
    "f2_butler": "f2_butler", "f2_henry_room": "f2_butler", "f2_butler_room": "f2_butler",
    "f2_lounge": "f2_lounge", "f2_common_lounge": "f2_lounge", "f2_common_room": "f2_lounge",
    "f2_guest_1": "f2_guest_1", "f2_room_1": "f2_guest_1",
    "f2_guest_2": "f2_guest_2", "f2_room_2": "f2_guest_2",
    "f2_guest_3": "f2_guest_3", "f2_room_3": "f2_guest_3",
    "f2_guest_4": "f2_guest_4", "f2_room_4": "f2_guest_4",
    "f2_guest_5": "f2_guest_5", "f2_room_5": "f2_guest_5",
    "f2_guest_6": "f2_guest_6", "f2_room_6": "f2_guest_6",
    "f2_guest_7": "f2_guest_7", "f2_room_7": "f2_guest_7",
    "f2_guest_8": "f2_guest_8", "f2_room_8": "f2_guest_8",
    "f2_guest_9": "f2_guest_9", "f2_room_9": "f2_guest_9",
    "f2_guest_10": "f2_guest_10", "f2_room_10": "f2_guest_10",
    "f2_secret": "f2_secret", "f2_secret_passage": "f2_secret",
    "f2_stairs_left": "f2_stairs_left", "f2_stairs_right": "f2_stairs_right",

    "f3_master": "f3_master", "f3_master_bedroom": "f3_master",
    "f3_kids": "f3_kids", "f3_kids_room": "f3_kids",
    "f3_secret": "f3_secret", "f3_secret_kids": "f3_secret",
    "f3_vip": "f3_vip", "f3_vip_lounge": "f3_vip",
    "f3_office": "f3_office", "f3_arthur_office": "f3_office", "f3_study": "f3_office",
    "f3_reading": "f3_reading", "f3_reading_room": "f3_reading",
    "f3_locked_library": "f3_locked_library", "f3_private_library": "f3_locked_library",
    "f3_gym": "f3_gym", "f3_spa": "f3_gym", "f3_gym_spa": "f3_gym",
    "f3_stairs_left": "f3_stairs_left", "f3_stairs_right": "f3_stairs_right",

    "f4_waiting_hall": "f4_waiting_hall", "f4_waiting": "f4_waiting_hall", "f4_hall": "f4_waiting_hall",
    "f4_cinema": "f4_cinema", "f4_movie_room": "f4_cinema",
    "f4_bell_tower": "f4_bell_tower", "f4_tower": "f4_bell_tower",
    "f4_bar": "f4_bar",
    "f4_games": "f4_games", "f4_game_room": "f4_games", "f4_poker": "f4_games",
    "f4_karaoke": "f4_karaoke",
    "f4_greenhouse": "f4_greenhouse", "f4_garden": "f4_greenhouse",
    "f4_zen_temple": "f4_zen_temple", "f4_temple": "f4_zen_temple", "f4_zen": "f4_zen_temple"
  };

  function normId(id) {
    if (!id || typeof id !== "string") return "";
    const k = id.trim().toLowerCase();
    return ALIAS_MAP[k] || k;
  }

  // 2. SƠ ĐỒ KIẾN TRÚC 5 TẦNG (TỌA ĐỘ 700x460)
  const FLOORS = {
    B1: {
      tabLabel: "HẦM\nB1",
      title: "TẦNG HẦM B1 • KHU KỸ THUẬT & KHO ĐÔNG LẠNH",
      outline: "M 110,50 H 590 V 410 H 110 Z",
      rooms: [
        { id: "b1_stairs", name: "Cầu Thang Hầm & Hành Lang Ống", short: "THANG HẦM & ĐƯỜNG ỐNG", x: 130, y: 70, w: 210, h: 145, desc: "Cầu thang bê tông ẩm mốc nối lên Nhà Bếp Tầng 1. Dọc trần là hệ thống ống hơi nước." },
        { id: "b1_pantry", name: "Kho Thực Phẩm Lạnh", short: "KHO THỰC PHẨM", x: 355, y: 70, w: 215, h: 145, desc: "Kho trữ đông thực phẩm và nhu yếu phẩm cho 24 người." },
        { id: "b1_cellar", name: "Hầm Rượu Vang Cổ", short: "HẦM RƯỢU VANG", x: 130, y: 230, w: 210, h: 160, desc: "Những kệ gỗ sồi chứa hàng trăm chai rượu vang đắt tiền của Arthur." },
        { id: "b1_boiler", name: "Phòng Lò Sưởi & Máy Phát Điện", short: "LÒ SƯỞI & MÁY PHÁT", x: 355, y: 230, w: 215, h: 160, lockedByDefault: true, desc: "Khu kỹ thuật do thợ máy Logan giữ chìa khóa. Chứa lò đốt sưởi trung tâm và máy phát điện." }
      ]
    },
    F1: {
      tabLabel: "TẦNG\n1",
      title: "TẦNG 1 • ĐẠI SẢNH, KHIÊU VŨ & NGOẠI CẢNH",
      outline: "M 25,25 H 675 V 435 H 25 Z",
      rooms: [
        { id: "f1_stairs_left", name: "Cầu Thang Cánh Trái (T1)", short: "THANG TRÁI", x: 40, y: 40, w: 145, h: 65, desc: "Cầu thang gỗ dẫn lên đầu trái Tầng 2 (Phòng Quản gia Henry)." },
        { id: "f1_kitchen", name: "Nhà Bếp (Chef Martha)", short: "NHÀ BẾP", x: 40, y: 115, w: 145, h: 130, desc: "Khu bếp lớn có giá dao sắc nhọn và cửa phụ dẫn xuống Tầng Hầm B1." },
        { id: "f1_dining", name: "Phòng Ăn Lớn", short: "PHÒNG ĂN LỚN", x: 40, y: 255, w: 145, h: 165, desc: "Bàn tiệc dài 24 ghế dưới ánh đèn chùm." },

        { id: "f1_living", name: "Phòng Khách Chính (Lò Sưởi)", short: "PHÒNG KHÁCH CHÍNH", x: 200, y: 40, w: 300, h: 110, desc: "Phòng khách trung tâm có lò sưởi đá cẩm thạch lớn nhất biệt thự." },
        { id: "f1_lib_west", name: "Thư Viện Tây", short: "THƯ VIỆN TÂY", x: 200, y: 160, w: 92, h: 135, desc: "Thư viện đối xứng bên trái Đại Sảnh." },
        { id: "f1_grand_hall", name: "Sảnh Đón Khách (Grand Hall)", short: "SẢNH ĐÓN KHÁCH", x: 300, y: 160, w: 100, h: 155, savePoint: 1, desc: "Đặt đồng hồ quả lắc lớn và bình hoa hồng đỏ thẫm [🌹 SAVE POINT #1] sau cầu thang chính." },
        { id: "f1_lib_east", name: "Thư Viện Đông", short: "THƯ VIỆN ĐÔNG", x: 408, y: 160, w: 92, h: 135, desc: "Thư viện đối xứng bên phải Đại Sảnh, chứa nhiều kệ sách gỗ sồi cao sát trần." },
        { id: "f1_secret", name: "Mật Thất Thư Viện Đông", short: "🕵️ MẬT THẤT T1", x: 408, y: 302, w: 92, h: 52, isSecret: true, desc: "Căn phòng bí mật ẩn sau kệ sách xoay 90 độ của Thư Viện Đông." },
        { id: "f1_maze", name: "Mê Cung Tuyết & Vườn Hoa", short: "MÊ CUNG TUYẾT (NGOÀI TRỜI)", x: 200, y: 362, w: 300, h: 58, desc: "Ngoại cảnh phía trước cửa chính, hiện đã bị bão tuyết vùi lấp hoàn toàn." },

        { id: "f1_stairs_right", name: "Cầu Thang Cánh Phải (T1)", short: "THANG PHẢI", x: 515, y: 40, w: 145, h: 65, desc: "Dẫn lên Sảnh Sinh Hoạt Chung ở đầu phải Tầng 2." },
        { id: "f1_pool", name: "Hồ Bơi & Phòng Thay Đồ", short: "HỒ BƠI", x: 515, y: 115, w: 145, h: 110, desc: "Hồ bơi nước lạnh trong nhà nằm phía sau Sảnh Khiêu Vũ." },
        { id: "f1_ballroom", name: "Sảnh Khiêu Vũ (Ballroom)", short: "SẢNH KHIÊU VŨ", x: 515, y: 235, w: 145, h: 115, desc: "Sảnh khiêu vũ rộng lớn thông liền với Sân Khấu Lớn." },
        { id: "f1_stage", name: "Sân Khấu Lớn", short: "SÂN KHẤU LỚN", x: 515, y: 355, w: 145, h: 65, desc: "Bục sân khấu trải thảm nhung đỏ tại Sảnh Khiêu Vũ." }
      ]
    },
    F2: {
      tabLabel: "TẦNG\n2",
      title: "TẦNG 2 • HÀNH LANG DÀI & 10 CĂN HỘ KHÁCH",
      outline: "M 25,35 H 675 V 425 H 25 Z",
      rooms: [
        { id: "f2_stairs_left", name: "Cầu Thang Trái (T2)", short: "THANG TRÁI", x: 40, y: 50, w: 105, h: 85, desc: "Nối xuống Nhà Bếp (F1) và dẫn lên cửa khóa Tầng 3." },
        { id: "f2_butler", name: "Phòng Quản Gia Henry", short: "P. QUẢN GIA", x: 40, y: 145, w: 105, h: 265, desc: "Phòng riêng của Quản gia trưởng Henry ngay đầu hành lang." },

        { id: "f2_secret", name: "Khoang Rỗng Phòng Số 1", short: "🕵️ MẬT ĐẠO P.1", x: 155, y: 42, w: 74, h: 42, isSecret: true, desc: "Khoang rỗng bí mật nằm sau vách tủ quần áo của Phòng Khách #1." },
        { id: "f2_guest_1", name: "Căn Hộ Khách #1", short: "PHÒNG #1", x: 155, y: 90, w: 74, h: 105, desc: "Căn hộ khách số 1 có phòng tắm khép kín và chốt trong." },
        { id: "f2_guest_2", name: "Căn Hộ Khách #2", short: "PHÒNG #2", x: 235, y: 90, w: 74, h: 105, desc: "Căn hộ khách số 2." },
        { id: "f2_guest_3", name: "Căn Hộ Khách #3", short: "PHÒNG #3", x: 315, y: 90, w: 74, h: 105, desc: "Căn hộ khách số 3." },
        { id: "f2_guest_4", name: "Căn Hộ Khách #4", short: "PHÒNG #4", x: 395, y: 90, w: 74, h: 105, desc: "Căn hộ khách số 4." },
        { id: "f2_guest_5", name: "Căn Hộ Khách #5", short: "PHÒNG #5", x: 475, y: 90, w: 74, h: 105, desc: "Căn hộ khách số 5." },

        { id: "f2_hallway", name: "Trục Hành Lang Dài (Tầng 2)", short: "TRỤC HÀNH LANG DÀI", x: 155, y: 203, w: 394, h: 74, desc: "Hành lang hẹp, tối và ngột ngạt chia đôi hai dãy phòng khách." },

        { id: "f2_guest_6", name: "Căn Hộ Khách #6", short: "PHÒNG #6", x: 155, y: 285, w: 74, h: 125, desc: "Căn hộ khách số 6." },
        { id: "f2_guest_7", name: "Căn Hộ Khách #7", short: "PHÒNG #7", x: 235, y: 285, w: 74, h: 125, desc: "Căn hộ khách số 7." },
        { id: "f2_guest_8", name: "Căn Hộ Khách #8", short: "PHÒNG #8", x: 315, y: 285, w: 74, h: 125, desc: "Căn hộ khách số 8." },
        { id: "f2_guest_9", name: "Căn Hộ Khách #9", short: "PHÒNG #9", x: 395, y: 285, w: 74, h: 125, desc: "Căn hộ khách số 9." },
        { id: "f2_guest_10", name: "Căn Hộ Khách #10", short: "PHÒNG #10", x: 475, y: 285, w: 74, h: 125, desc: "Căn hộ khách số 10." },

        { id: "f2_stairs_right", name: "Cầu Thang Phải (T2)", short: "THANG PHẢI", x: 558, y: 50, w: 102, h: 85, desc: "Nối xuống Cánh Phải (F1) và dẫn lên Tầng 3." },
        { id: "f2_lounge", name: "Sảnh Sinh Hoạt Chung", short: "SẢNH CHUNG", x: 558, y: 145, w: 102, h: 265, savePoint: 2, desc: "Sảnh nghỉ đầu phải hành lang. Có đặt bình hoa hồng đỏ [🌹 SAVE POINT #2]." }
      ]
    },
    F3: {
      tabLabel: "TẦNG\n3",
      title: "TẦNG 3 • KHU GIA CHỦ HẠN CHẾ (KHÓA NGHIÊM NGẶT)",
      outline: "M 25,35 H 675 V 425 H 25 Z",
      rooms: [
        { id: "f3_stairs_left", name: "Cầu Thang Trái (T3)", short: "THANG TRÁI", x: 40, y: 50, w: 105, h: 85, lockedByDefault: true, desc: "Cửa ngăn cầu thang lên Nhánh Trái Tầng 3." },
        { id: "f3_vip", name: "Phòng Khách VIP", short: "KHÁCH VIP", x: 40, y: 145, w: 105, h: 265, lockedByDefault: true, desc: "Phòng tiếp khách mật của Arthur." },
        { id: "f3_master", name: "2 Phòng Ngủ Master (Arthur & Diana)", short: "2 PHÒNG MASTER", x: 155, y: 50, w: 180, h: 170, lockedByDefault: true, desc: "Khu phòng ngủ chính của vợ chồng chủ biệt thự." },
        { id: "f3_kids", name: "Phòng Ngủ Trẻ Em", short: "PHÒNG TRẺ EM", x: 155, y: 230, w: 180, h: 115, lockedByDefault: true, desc: "Phòng trẻ em bỏ trống bám đầy bụi, có tủ đồ chơi lớn kê sát tường." },
        { id: "f3_secret", name: "Lối Ngầm Phòng Trẻ Em", short: "🕵️ LỐI NGẦM T3", x: 155, y: 352, w: 180, h: 58, isSecret: true, desc: "Lối mật đạo ẩn sau chiếc tủ đồ chơi trong Phòng Trẻ Em." },

        { id: "f3_office", name: "Phòng Làm Việc của Arthur", short: "P. LÀM VIỆC ARTHUR", x: 365, y: 50, w: 180, h: 170, lockedByDefault: true, desc: "Phòng làm việc kiên cố có két sắt âm tường." },
        { id: "f3_reading", name: "Phòng Đọc Sách", short: "PHÒNG ĐỌC SÁCH", x: 365, y: 230, w: 180, h: 180, savePoint: 3, lockedByDefault: true, desc: "Cạnh cửa sổ vòm có đặt bình hoa hồng đỏ [🌹 SAVE POINT #3]." },
        { id: "f3_stairs_right", name: "Cầu Thang Phải (T3)", short: "THANG PHẢI", x: 555, y: 50, w: 105, h: 85, lockedByDefault: true, desc: "Cầu thang dẫn lên Tầng 4." },
        { id: "f3_locked_library", name: "Thư Viện Khép Kín", short: "THƯ VIỆN KHÓA", x: 555, y: 145, w: 105, h: 130, lockedByDefault: true, desc: "Thư viện mật khóa hai lớp của gia chủ." },
        { id: "f3_gym", name: "Phòng Gym & Spa", short: "GYM & SPA", x: 555, y: 285, w: 105, h: 125, lockedByDefault: true, desc: "Khu tập thể hình và xông hơi riêng." }
      ]
    },
    F4: {
      tabLabel: "TẦNG\n4",
      title: "TẦNG 4 • KHU GIẢI TRÍ, VƯỜN THƯỢNG UYỂN & THIỀN VIỆN",
      outline: "M 25,35 H 675 V 425 H 25 Z",
      rooms: [
        { id: "f4_bell_tower", name: "Tháp Chuông", short: "THÁP CHUÔNG", x: 40, y: 50, w: 145, h: 170, desc: "Tháp chuông cao nhìn thẳng xuống vực núi tuyết." },
        { id: "f4_cinema", name: "Phòng Chiếu Phim Cách Âm", short: "PHÒNG CHIẾU PHIM", x: 40, y: 230, w: 145, h: 180, desc: "Phòng chiếu phim bọc mút cách âm tuyệt đối." },

        { id: "f4_bar", name: "Quán Bar", short: "QUÁN BAR", x: 198, y: 50, w: 148, h: 110, desc: "Quầy bar giải trí trên tầng 4." },
        { id: "f4_karaoke", name: "Phòng Karaoke", short: "PHÒNG KARAOKE", x: 354, y: 50, w: 148, h: 110, desc: "Phòng hát cách âm." },
        { id: "f4_waiting_hall", name: "Sảnh Chờ Hẹp Trung Tâm", short: "SẢNH CHỜ TRUNG TÂM", x: 198, y: 170, w: 304, h: 105, savePoint: 4, desc: "Trung tâm Tầng 4, nơi đặt bình hoa hồng đỏ [🌹 SAVE POINT #4]." },
        { id: "f4_games", name: "2 Phòng Chơi Game (Bi-a & Poker)", short: "2 PHÒNG GAME", x: 198, y: 285, w: 304, h: 125, desc: "Gồm phòng bàn Bi-a và phòng đánh bài Poker." },

        { id: "f4_greenhouse", name: "Vườn Thượng Uyển (Nhà Kính)", short: "VƯỜN THƯỢNG UYỂN", x: 515, y: 50, w: 145, h: 215, desc: "Nhà kính trồng các giống phong lan quý có độc tính cao." },
        { id: "f4_zen_temple", name: "Thiền Viện Bí Mật", short: "THIỀN VIỆN BÍ MẬT", x: 515, y: 275, w: 145, h: 135, desc: "Thiền viện tĩnh mịch nằm cuối lối đá hẹp sau Vườn Thượng Uyển." }
      ]
    }
  };

  // 3. CSS GIAO DIỆN GIẤY CỔ ĐIỂN (Sửa triệt để lỗi phông chữ tiếng Việt)
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Be+Vietnam+Pro:wght@400;600;700&display=swap');
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #efe6d5;
      color: #2b1d12;
      font-family: 'Merriweather', 'Georgia', 'Times New Roman', serif;
      user-select: none;
      -webkit-font-smoothing: antialiased;
    }
    .vm-container {
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      background: #efe6d5;
      border: 2px solid #3a2314;
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
    }
    /* TOP HEADER */
    .vm-header {
      background: #2b1810;
      color: #f3e9d2;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #8c6239;
      gap: 12px;
    }
    .vm-logo {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 3px;
      line-height: 1.15;
      color: #e6ccb2;
      flex-shrink: 0;
    }
    .vm-atmo {
      font-size: 13.5px;
      font-style: italic;
      text-align: center;
      color: #f5ebe0;
      line-height: 1.4;
      flex: 1;
    }
    .vm-meta {
      text-align: right;
      font-family: 'Be Vietnam Pro', sans-serif;
      font-size: 12px;
      line-height: 1.45;
      color: #e6ccb2;
      flex-shrink: 0;
    }
    /* MAIN BODY (2 COLUMNS) */
    .vm-body {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      min-height: 410px;
    }
    @media (max-width: 680px) {
      .vm-body { grid-template-columns: 1fr; }
    }
    /* LEFT COLUMN: MAP & CONTROLS */
    .vm-left {
      padding: 12px;
      border-right: 1px solid #c8b69b;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: linear-gradient(180deg, #efe6d5 0%, #e3d5bd 100%);
    }
    .vm-tabs {
      display: flex;
      gap: 6px;
    }
    .vm-tab {
      flex: 1;
      background: #e6dac6;
      border: 1px solid #8c7355;
      border-radius: 3px;
      padding: 6px 4px;
      font-family: 'Be Vietnam Pro', sans-serif;
      font-size: 11.5px;
      font-weight: 700;
      color: #3a2314;
      cursor: pointer;
      white-space: pre-line;
      text-align: center;
      line-height: 1.2;
      transition: all 0.15s;
    }
    .vm-tab:hover { background: #d8c6a8; }
    .vm-tab.active {
      background: #2b1810;
      color: #f3e9d2;
      border-color: #2b1810;
    }
    .vm-floor-caption {
      font-family: 'Be Vietnam Pro', sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: #6b4c35;
      letter-spacing: 0.5px;
    }
    /* MAP VIEWPORT */
    .vm-viewport {
      position: relative;
      width: 100%;
      height: 290px;
      background: #e5d8c1;
      border: 1.5px solid #8c7355;
      box-shadow: inset 0 2px 8px rgba(58, 35, 20, 0.18);
      overflow: hidden;
      cursor: grab;
    }
    .vm-viewport:active { cursor: grabbing; }
    .vm-zoom-controls {
      position: absolute;
      top: 8px;
      left: 8px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      z-index: 10;
    }
    .vm-zbtn {
      width: 32px;
      height: 32px;
      background: #efe6d5;
      border: 1px solid #8c7355;
      color: #2b1810;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }
    .vm-zbtn:hover { background: #dfd1b8; }

    /* SVG ELEMENTS */
    svg.vm-svg {
      width: 100%;
      height: 100%;
      display: block;
      transform-origin: center center;
      transition: transform 0.12s ease-out;
    }
    .vm-room { cursor: pointer; }
    .vm-room-rect {
      fill: #f6efe2;
      stroke: #5c4028;
      stroke-width: 2px;
      transition: all 0.2s;
    }
    .vm-room:hover .vm-room-rect {
      fill: #fffdf9;
      stroke: #8b0000;
      stroke-width: 2.5px;
    }
    .vm-room.is-active .vm-room-rect {
      fill: #f8d7da;
      stroke: #9b1c1c;
      stroke-width: 3px;
    }
    .vm-room.is-selected .vm-room-rect {
      stroke: #b45309;
      stroke-width: 3px;
      stroke-dasharray: 4,2;
    }
    /* Làm mờ & kẻ sọc phòng khóa */
    .vm-room.is-locked .vm-room-rect {
      fill: url(#parchment-lock-hatch);
      stroke: #786554;
      stroke-dasharray: 5, 3;
    }
    .vm-room.is-locked .vm-room-label {
      opacity: 0.35;
      filter: blur(1px);
    }
    /* Mật đạo */
    .vm-room.is-secret .vm-room-rect {
      fill: #fef3c7;
      stroke: #b45309;
      stroke-width: 2.2px;
      stroke-dasharray: 5, 3;
    }

    /* FOOTER LEFT */
    .vm-left-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-top: 2px;
    }
    .vm-goto-btn {
      background: #efe6d5;
      border: 1.5px solid #6b4c35;
      padding: 7px 18px;
      font-family: 'Be Vietnam Pro', sans-serif;
      font-weight: 700;
      font-size: 13px;
      color: #2b1810;
      cursor: pointer;
      letter-spacing: 1px;
    }
    .vm-goto-btn:hover { background: #2b1810; color: #f3e9d2; }
    .vm-hint {
      font-size: 11.5px;
      font-style: italic;
      color: #6b4c35;
    }

    /* RIGHT COLUMN: DETAILS */
    .vm-right {
      padding: 16px 18px;
      max-height: 430px;
      overflow-y: auto;
      background: #f5eedf;
    }
    .vm-room-title {
      font-size: 18px;
      font-weight: 700;
      color: #2b1810;
      margin: 0 0 4px 0;
    }
    .vm-save-tag {
      font-size: 12.5px;
      color: #2e6f40;
      font-style: italic;
      margin-bottom: 14px;
      display: block;
    }
    .vm-sec-title {
      font-family: 'Be Vietnam Pro', sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #6b4c35;
      margin: 14px 0 6px 0;
      text-transform: uppercase;
    }
    .vm-sec-body {
      font-size: 14px;
      line-height: 1.6;
      color: #2b1d12;
      margin: 0 0 10px 0;
    }
    .vm-who-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }
    .vm-who-badge {
      padding: 4px 10px;
      border-radius: 3px;
      font-family: 'Be Vietnam Pro', sans-serif;
      font-size: 12px;
      font-weight: 600;
      background: #e2ecf5;
      border: 1px solid #7ea3c4;
      color: #1e3a5f;
    }
    .vm-who-badge.bad {
      background: #f8d7da;
      border-color: #c87a82;
      color: #721c24;
    }
  `;

  // 4. HÀM KHỞI TẠO CHÍNH
  function initCrookedMap(rawCfg) {
    const cfg = rawCfg || {};
    const activeId = normId(cfg.activeRoomId || "f1_grand_hall");

    const unlockedRooms = new Set((Array.isArray(cfg.unlockedRooms) ? cfg.unlockedRooms : []).map(normId));
    if (activeId) unlockedRooms.add(activeId);

    const unlockedSecrets = new Set((Array.isArray(cfg.unlockedSecrets) ? cfg.unlockedSecrets : []).map(normId));
    if (activeId === "f1_secret" || activeId === "f2_secret" || activeId === "f3_secret") {
      unlockedSecrets.add(activeId);
    }

    const roomStateMap = {};
    if (cfg.rooms && typeof cfg.rooms === "object") {
      Object.keys(cfg.rooms).forEach((k) => {
        roomStateMap[normId(k)] = cfg.rooms[k];
      });
    }

    let currentFloor = (cfg.currentFloor || "F1").toUpperCase().trim();
    if (!FLOORS[currentFloor]) {
      const pref = activeId.split("_")[0].toUpperCase();
      currentFloor = FLOORS[pref] ? pref : "F1";
    }
    let selectedId = activeId;

    // Biến điều khiển Zoom & Kéo bản đồ
    let scale = 1;
    let panX = 0;
    let panY = 0;

    if (!document.getElementById("vm-crooked-css")) {
      const st = document.createElement("style");
      st.id = "vm-crooked-css";
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    let root = document.getElementById("vm-crooked-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "vm-crooked-root";
      document.body.appendChild(root);
    }

    function isLocked(r) {
      return Boolean(r.lockedByDefault && !unlockedRooms.has(r.id));
    }

    function isSecretShown(r) {
      if (!r.isSecret) return true;
      return unlockedSecrets.has(r.id);
    }

    function findRoom(id) {
      for (const fk of Object.keys(FLOORS)) {
        const rm = FLOORS[fk].rooms.find((x) => x.id === id);
        if (rm) return { floorKey: fk, room: rm };
      }
      return null;
    }

    function renderSVG(floorKey) {
      const fl = FLOORS[floorKey];
      let nodes = "";

      fl.rooms.forEach((r) => {
        // Ẩn tuyệt đối mật đạo nếu chưa có trong unlockedSecrets
        if (!isSecretShown(r)) return;

        const locked = isLocked(r);
        const isHere = r.id === activeId;
        const isSel = r.id === selectedId;

        const cls = [
          "vm-room",
          locked ? "is-locked" : "",
          r.isSecret ? "is-secret" : "",
          isHere ? "is-active" : "",
          isSel ? "is-selected" : ""
        ].filter(Boolean).join(" ");

        const cx = r.x + r.w / 2;
        const cy = r.y + r.h / 2;

        let iconOverlay = "";
        if (locked) {
          iconOverlay = `
            <g transform="translate(${cx}, ${cy + 12})">
              <rect x="-32" y="-9" width="64" height="16" rx="2" fill="#3a2314"/>
              <text x="0" y="3" fill="#f3e9d2" font-family="Be Vietnam Pro, sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle">🔒 KHÓA</text>
            </g>
          `;
        } else {
          if (r.savePoint) {
            iconOverlay += `<text x="${r.x + r.w - 12}" y="${r.y + 15}" font-size="12" text-anchor="middle">🌹</text>`;
          }
          if (isHere) {
            iconOverlay += `
              <g transform="translate(${cx}, ${cy + 14})">
                <rect x="-38" y="-8" width="76" height="15" rx="7" fill="#8b0000"/>
                <text x="0" y="3" fill="#fff" font-family="Be Vietnam Pro, sans-serif" font-size="8" font-weight="bold" text-anchor="middle">📍 ĐANG Ở ĐÂY</text>
              </g>
            `;
          }
        }

        nodes += `
          <g class="${cls}" data-id="${r.id}">
            <rect class="vm-room-rect" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2"/>
            <text class="vm-room-label" x="${cx}" y="${locked ? cy - 4 : cy}"
                  fill="#2b1810" font-family="Be Vietnam Pro, sans-serif"
                  font-size="${r.w < 85 ? "8" : "9.5"}" font-weight="700" text-anchor="middle">
              ${r.short}
            </text>
            ${iconOverlay}
          </g>
        `;
      });

      return `
        <svg class="vm-svg" id="vm-svg-canvas" viewBox="0 0 700 460" xmlns="http://www.w3.org/2000/svg"
             style="transform: translate(${panX}px, ${panY}px) scale(${scale});">
          <defs>
            <pattern id="parchment-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d5c4a8" stroke-width="0.8"/>
            </pattern>
            <pattern id="parchment-lock-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#d8cab2"/>
              <line x1="0" y1="0" x2="0" y2="8" stroke="#b5a184" stroke-width="3"/>
            </pattern>
          </defs>
          <rect width="700" height="460" fill="url(#parchment-grid)"/>
          <path d="${fl.outline}" fill="#eadec9" stroke="#3a2314" stroke-width="4"/>
          ${nodes}
        </svg>
      `;
    }

    function renderRightPanel(id) {
      const found = findRoom(id);
      if (!found || !isSecretShown(found.room)) {
        return `<div class="vm-sec-body">Chọn một phòng trên bản đồ để xem chi tiết.</div>`;
      }

      const { room } = found;
      const locked = isLocked(room);
      const st = roomStateMap[room.id] || {};

      if (locked) {
        return `
          <h3 class="vm-room-title">🔒 ${room.name}</h3>
          <span class="vm-save-tag" style="color:#8b0000;">Khu vực đang bị khóa chặt</span>
          <div class="vm-sec-title">🔒 TRẠNG THÁI CỬA</div>
          <p class="vm-sec-body">${room.desc}</p>
          <p class="vm-sec-body" style="color:#8b0000; font-style:italic;">
            Cửa phòng này hiện đang khóa. Bạn và Charles cần tìm đúng chìa khóa (từ Quản gia Henry, Thợ máy Logan, lục soát hiện trường) hoặc nhờ Greg mở khóa để tiếp cận.
          </p>
        `;
      }

      const hearTxt = st.hear || "Tiếng gió tuyết rít bên ngoài khung cửa kính.";
      const seeTxt = st.see || room.desc;
      const whoArr = Array.isArray(st.who) && st.who.length > 0 ? st.who : (room.id === activeId ? ["Charles (Cạnh bạn)"] : ["Chưa ghi nhận"]);
      const clueTxt = st.clue || "Dùng lệnh /khampha tại phòng này để kiểm tra kỹ các dấu vết vật lý.";

      const whoBadges = whoArr.map((w) => {
        const isCorpse = /xác|thi thể|nạn nhân|chết/i.test(w);
        return `<span class="vm-who-badge ${isCorpse ? "bad" : ""}">${w}</span>`;
      }).join("");

      return `
        <h3 class="vm-room-title">${room.name}</h3>
        ${room.savePoint ? `<span class="vm-save-tag">🌹 Điểm Lưu Trữ An Toàn (Save Point #${room.savePoint})</span>` : ""}

        <div class="vm-sec-title">👂 NGHE HÓNG</div>
        <p class="vm-sec-body">${hearTxt}</p>

        <div class="vm-sec-title">👁️ QUAN SÁT</div>
        <p class="vm-sec-body">${seeTxt}</p>

        <div class="vm-sec-title">👥 AI ĐÓ</div>
        <div class="vm-who-list">${whoBadges}</div>

        <div class="vm-sec-title">🔍 GHI CHÚ TRINH SÁT</div>
        <p class="vm-sec-body">${clueTxt}</p>
      `;
    }

    function updateTransform() {
      const svgEl = document.getElementById("vm-svg-canvas");
      if (svgEl) {
        svgEl.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
      }
    }

    function render() {
      const flObj = FLOORS[currentFloor];
      const tabsHtml = ["B1", "F1", "F2", "F3", "F4"].map((k) => {
        return `<button class="vm-tab ${k === currentFloor ? "active" : ""}" data-fl="${k}">${FLOORS[k].tabLabel}</button>`;
      }).join("");

      const foundSel = findRoom(selectedId);
      const selName = foundSel ? foundSel.room.name : "khu vực này";

      root.innerHTML = `
        <div class="vm-container">
          <div class="vm-header">
            <div class="vm-logo">CROOKED<br/>MAP</div>
            <div class="vm-atmo">${cfg.atmosphere || "Bão tuyết phong tỏa • Mọi đường dây liên lạc đã bị cắt đứt."}</div>
            <div class="vm-meta">
              <strong>${cfg.time || "18:00"}</strong> | 🌡️ <strong>${cfg.temp || "15°C"}</strong><br/>
              Ngày ${cfg.day || "1/5"} • Biệt Thự Rừng Thẳm
            </div>
          </div>

          <div class="vm-body">
            <div class="vm-left">
              <div class="vm-tabs">${tabsHtml}</div>
              <div class="vm-floor-caption">${flObj.title}</div>

              <div class="vm-viewport" id="vm-map-viewport">
                <div class="vm-zoom-controls">
                  <button class="vm-zbtn" id="vm-z-in" title="Phóng to">+</button>
                  <button class="vm-zbtn" id="vm-z-out" title="Thu nhỏ">−</button>
                  <button class="vm-zbtn" id="vm-z-reset" title="Đặt lại góc nhìn">↗</button>
                </div>
                ${renderSVG(currentFloor)}
              </div>

              <div class="vm-left-foot">
                <button class="vm-goto-btn" id="vm-goto-btn" title="Copy lệnh di chuyển tới ${selName}">TỚI ĐÓ</button>
                <span class="vm-hint" id="vm-hint-text">Bấm vào phòng để trinh sát • Kéo để di chuyển bản đồ</span>
              </div>
            </div>

            <div class="vm-right">
              ${renderRightPanel(selectedId)}
            </div>
          </div>
        </div>
      `;

      // Sự kiện chuyển tầng
      root.querySelectorAll(".vm-tab").forEach((b) => {
        b.addEventListener("click", function () {
          currentFloor = this.getAttribute("data-fl");
          scale = 1; panX = 0; panY = 0;
          const vis = FLOORS[currentFloor].rooms.filter(isSecretShown);
          const here = vis.find((r) => r.id === activeId);
          selectedId = here ? here.id : (vis[0] ? vis[0].id : "");
          render();
        });
      });

      // Sự kiện chọn phòng
      root.querySelectorAll(".vm-room").forEach((g) => {
        g.addEventListener("click", function (e) {
          e.stopPropagation();
          selectedId = this.getAttribute("data-id");
          render();
        });
      });

      // Sự kiện Zoom +, -, Reset
      document.getElementById("vm-z-in").addEventListener("click", () => {
        scale = Math.min(2.4, +(scale + 0.25).toFixed(2));
        updateTransform();
      });
      document.getElementById("vm-z-out").addEventListener("click", () => {
        scale = Math.max(0.7, +(scale - 0.25).toFixed(2));
        updateTransform();
      });
      document.getElementById("vm-z-reset").addEventListener("click", () => {
        scale = 1; panX = 0; panY = 0;
        updateTransform();
      });

      // Kéo thả bản đồ (Drag/Pan)
      const vp = document.getElementById("vm-map-viewport");
      let isDown = false, startX = 0, startY = 0;
      vp.addEventListener("mousedown", (e) => {
        if (e.target.closest(".vm-zbtn")) return;
        isDown = true; startX = e.clientX - panX; startY = e.clientY - panY;
      });
      window.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        panX = e.clientX - startX; panY = e.clientY - startY;
        updateTransform();
      });
      window.addEventListener("mouseup", () => { isDown = false; });

      // Nút "TỚI ĐÓ": Tự động copy câu lệnh di chuyển vào bộ nhớ tạm
      document.getElementById("vm-goto-btn").addEventListener("click", () => {
        const target = findRoom(selectedId);
        if (!target) return;
        const moveText = `Tôi và Charles di chuyển tới ${target.room.name}.`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(moveText);
        }
        const hintEl = document.getElementById("vm-hint-text");
        if (hintEl) {
          hintEl.textContent = `Đã chép: "${moveText}" (Dán vào ô chat!)`;
          hintEl.style.color = "#8b0000";
          hintEl.style.fontWeight = "bold";
        }
      });
    }

    render();
  }

  global.initCrookedMap = initCrookedMap;
})(window);
