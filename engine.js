/**
 * CROOKED MANSION ARCHITECTURAL ENGINE v2.5 (Uketsu / IB Blueprint Edition)
 * Tích hợp cho prompt: Biệt Thự Rừng Thẳm (Charles)
 */

(function (global) {
  "use strict";

  // 1. BỘ ÁNH XẠ ID THÔNG MINH (Chống lỗi AI tự chế lệch tên ID phòng)
  const ALIAS_MAP = {
    // B1
    "b1_stairs": "b1_stairs",
    "b1_corridor": "b1_stairs",
    "b1_pipe_corridor": "b1_stairs",
    "b1_cellar": "b1_cellar",
    "b1_wine_cellar": "b1_cellar",
    "b1_wine": "b1_cellar",
    "b1_pantry": "b1_pantry",
    "b1_food_pantry": "b1_pantry",
    "b1_storage": "b1_pantry",
    "b1_boiler": "b1_boiler",
    "b1_generator": "b1_boiler",
    "b1_boiler_room": "b1_boiler",

    // F1
    "f1_exterior": "f1_maze",
    "f1_maze": "f1_maze",
    "f1_garden": "f1_maze",
    "f1_front_yard": "f1_maze",
    "f1_grand_hall": "f1_grand_hall",
    "f1_hall": "f1_grand_hall",
    "f1_lobby": "f1_grand_hall",
    "f1_main_hall": "f1_grand_hall",
    "f1_living": "f1_living",
    "f1_living_room": "f1_living",
    "f1_main_living": "f1_living",
    "f1_lib_west": "f1_lib_west",
    "f1_west_library": "f1_lib_west",
    "f1_library_west": "f1_lib_west",
    "f1_lib_east": "f1_lib_east",
    "f1_east_library": "f1_lib_east",
    "f1_library_east": "f1_lib_east",
    "f1_library": "f1_lib_east",
    "f1_secret": "f1_secret",
    "f1_secret_room": "f1_secret",
    "f1_secret_library": "f1_secret",
    "f1_dining": "f1_dining",
    "f1_dining_room": "f1_dining",
    "f1_grand_dining": "f1_dining",
    "f1_kitchen": "f1_kitchen",
    "f1_ballroom": "f1_ballroom",
    "f1_dance_hall": "f1_ballroom",
    "f1_stage": "f1_stage",
    "f1_main_stage": "f1_stage",
    "f1_pool": "f1_pool",
    "f1_indoor_pool": "f1_pool",
    "f1_lockers": "f1_pool",
    "f1_stairs_left": "f1_stairs_left",
    "f1_left_stairs": "f1_stairs_left",
    "f1_stairs_right": "f1_stairs_right",
    "f1_right_stairs": "f1_stairs_right",

    // F2
    "f2_hallway": "f2_hallway",
    "f2_corridor": "f2_hallway",
    "f2_long_hallway": "f2_hallway",
    "f2_butler": "f2_butler",
    "f2_henry_room": "f2_butler",
    "f2_butler_room": "f2_butler",
    "f2_lounge": "f2_lounge",
    "f2_common_lounge": "f2_lounge",
    "f2_common_room": "f2_lounge",
    "f2_guest_1": "f2_guest_1",
    "f2_room_1": "f2_guest_1",
    "f2_guest_2": "f2_guest_2",
    "f2_room_2": "f2_guest_2",
    "f2_guest_3": "f2_guest_3",
    "f2_room_3": "f2_guest_3",
    "f2_guest_4": "f2_guest_4",
    "f2_room_4": "f2_guest_4",
    "f2_guest_5": "f2_guest_5",
    "f2_room_5": "f2_guest_5",
    "f2_guest_6": "f2_guest_6",
    "f2_room_6": "f2_guest_6",
    "f2_guest_7": "f2_guest_7",
    "f2_room_7": "f2_guest_7",
    "f2_guest_8": "f2_guest_8",
    "f2_room_8": "f2_guest_8",
    "f2_guest_9": "f2_guest_9",
    "f2_room_9": "f2_guest_9",
    "f2_guest_10": "f2_guest_10",
    "f2_room_10": "f2_guest_10",
    "f2_secret": "f2_secret",
    "f2_secret_passage": "f2_secret",
    "f2_stairs_left": "f2_stairs_left",
    "f2_stairs_right": "f2_stairs_right",

    // F3
    "f3_master": "f3_master",
    "f3_master_bedroom": "f3_master",
    "f3_arthur_room": "f3_master",
    "f3_kids": "f3_kids",
    "f3_kids_room": "f3_kids",
    "f3_children_room": "f3_kids",
    "f3_secret": "f3_secret",
    "f3_secret_kids": "f3_secret",
    "f3_vip": "f3_vip",
    "f3_vip_lounge": "f3_vip",
    "f3_office": "f3_office",
    "f3_arthur_office": "f3_office",
    "f3_study": "f3_office",
    "f3_reading": "f3_reading",
    "f3_reading_room": "f3_reading",
    "f3_locked_library": "f3_locked_library",
    "f3_private_library": "f3_locked_library",
    "f3_gym": "f3_gym",
    "f3_spa": "f3_gym",
    "f3_gym_spa": "f3_gym",
    "f3_stairs_left": "f3_stairs_left",
    "f3_stairs_right": "f3_stairs_right",

    // F4
    "f4_waiting_hall": "f4_waiting_hall",
    "f4_waiting": "f4_waiting_hall",
    "f4_hall": "f4_waiting_hall",
    "f4_center_hall": "f4_waiting_hall",
    "f4_cinema": "f4_cinema",
    "f4_movie_room": "f4_cinema",
    "f4_bell_tower": "f4_bell_tower",
    "f4_tower": "f4_bell_tower",
    "f4_bar": "f4_bar",
    "f4_games": "f4_games",
    "f4_game_room": "f4_games",
    "f4_poker": "f4_games",
    "f4_karaoke": "f4_karaoke",
    "f4_greenhouse": "f4_greenhouse",
    "f4_garden": "f4_greenhouse",
    "f4_rooftop_garden": "f4_greenhouse",
    "f4_zen_temple": "f4_zen_temple",
    "f4_temple": "f4_zen_temple",
    "f4_zen": "f4_zen_temple"
  };

  function normalizeId(rawId) {
    if (!rawId || typeof rawId !== "string") return "";
    const clean = rawId.trim().toLowerCase();
    return ALIAS_MAP[clean] || clean;
  }

  // 2. CƠ SỞ DỮ LIỆU KIẾN TRÚC 5 TẦNG (TỌA ĐỘ SVG 760x480)
  const MANOR_BLUEPRINT = {
    B1: {
      code: "B1",
      name: "TẦNG HẦM KỸ THUẬT (UTILITY BASEMENT)",
      subtitle: "Lối vào duy nhất từ Cửa phụ Nhà Bếp Tầng 1 • Trần thấp, đường ống hơi nước rò rỉ",
      outline: "M 130,60 H 630 V 420 H 130 Z",
      corridors: [
        // Đường ống dẫn nhiệt ngầm
        `<line x1="150" y1="220" x2="610" y2="220" stroke="#334155" stroke-width="6" stroke-dasharray="10,4"/>`,
        `<line x1="370" y1="80" x2="370" y2="400" stroke="#334155" stroke-width="6" stroke-dasharray="10,4"/>`
      ],
      rooms: [
        {
          id: "b1_stairs",
          name: "Cầu Thang Hầm & Hành Lang Ống",
          shortName: "HÀNH LANG ĐƯỜNG ỐNG",
          x: 150, y: 80, w: 210, h: 130,
          archNote: "Cầu thang bê tông ẩm mốc nối thẳng lên Nhà Bếp (F1). Dọc trần là hệ thống ống dẫn nhiệt.",
          decor: `
            <rect x="165" y="95" width="75" height="36" fill="url(#stairs-pat)" stroke="#64748b" stroke-width="1"/>
            <text x="202" y="145" fill="#64748b" font-size="8" text-anchor="middle">▲ LÊN BẾP F1</text>
          `
        },
        {
          id: "b1_cellar",
          name: "Hầm Rượu Vang Cổ",
          shortName: "HẦM RƯỢU VANG",
          x: 150, y: 230, w: 210, h: 170,
          archNote: "Chứa hàng trăm chai vang đỏ đắt tiền của Arthur. Nhiệt độ luôn thấp và tối.",
          decor: `
            <rect x="170" y="250" width="22" height="120" fill="none" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,2"/>
            <rect x="205" y="250" width="22" height="120" fill="none" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,2"/>
            <circle cx="310" cy="340" r="18" fill="none" stroke="#475569" stroke-width="1.5"/>
          `
        },
        {
          id: "b1_pantry",
          name: "Kho Thực Phẩm Lạnh",
          shortName: "KHO THỰC PHẨM LẠNH",
          x: 380, y: 80, w: 230, h: 130,
          archNote: "Kho dự trữ lương thực cho 24 người trong 5 ngày bão tuyết.",
          decor: `
            <rect x="400" y="95" width="190" height="18" fill="none" stroke="#475569" stroke-width="1"/>
            <rect x="400" y="175" width="190" height="18" fill="none" stroke="#475569" stroke-width="1"/>
          `
        },
        {
          id: "b1_boiler",
          name: "Phòng Lò Sưởi & Máy Phát Điện",
          shortName: "LÒ SƯỞI & MÁY PHÁT",
          x: 380, y: 230, w: 230, h: 170,
          lockedByDefault: true,
          archNote: "Trái tim nhiệt lượng của biệt thự do thợ máy Logan giữ chìa. Chứa lò đốt dầu trung tâm và cầu dao tổng.",
          decor: `
            <circle cx="445" cy="315" r="32" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="6,3"/>
            <circle cx="445" cy="315" r="14" fill="none" stroke="#64748b" stroke-width="1"/>
            <rect x="510" y="275" width="75" height="80" fill="none" stroke="#64748b" stroke-width="2"/>
          `
        }
      ]
    },

    F1: {
      code: "F1",
      name: "TẦNG 1 — MẶT ĐẤT (GROUND FLOOR)",
      subtitle: "Khu vực sinh hoạt chung, Đại Sảnh, Phòng Khiêu Vũ & 2 Thư Viện đối xứng",
      outline: "M 35,30 H 725 V 450 H 35 Z",
      corridors: [
        // Đường nối Sảnh và Cánh Trái/Phải
        `<line x1="215" y1="220" x2="255" y2="220" stroke="#475569" stroke-width="2" stroke-dasharray="3,3"/>`,
        `<line x1="505" y1="220" x2="545" y2="220" stroke="#475569" stroke-width="2" stroke-dasharray="3,3"/>`
      ],
      rooms: [
        // Cánh Trái
        {
          id: "f1_stairs_left",
          name: "Cầu Thang Cánh Trái (T1)",
          shortName: "THANG TRÁI",
          x: 50, y: 45, w: 165, h: 65,
          archNote: "Cầu thang gỗ sồi dẫn lên khu phòng Quản gia Henry (F2) và nhánh trái F3.",
          decor: `<rect x="65" y="55" width="135" height="24" fill="url(#stairs-pat)" stroke="#64748b" stroke-width="1"/>`
        },
        {
          id: "f1_kitchen",
          name: "Nhà Bếp & Lối Xuống Hầm B1",
          shortName: "NHÀ BẾP (MARTHA)",
          x: 50, y: 120, w: 165, h: 135,
          archNote: "Do Bếp trưởng Martha kiểm soát. Có giá treo dao làm bếp và cửa dịch vụ dẫn xuống Tầng Hầm B1.",
          decor: `
            <rect x="62" y="132" width="140" height="20" fill="none" stroke="#475569" stroke-width="1.2"/>
            <rect x="62" y="215" width="55" height="26" fill="url(#stairs-pat)" stroke="#64748b" stroke-width="1"/>
            <text x="90" y="210" fill="#94a3b8" font-size="7.5" text-anchor="middle">▼ XUỐNG B1</text>
          `
        },
        {
          id: "f1_dining",
          name: "Phòng Ăn Lớn (Grand Dining)",
          shortName: "PHÒNG ĂN LỚN",
          x: 50, y: 265, w: 165, h: 170,
          archNote: "Bàn tiệc gỗ sồi dài 24 ghế dưới đèn chùm pha lê.",
          decor: `
            <rect x="95" y="295" width="75" height="110" rx="8" fill="none" stroke="#64748b" stroke-width="1.8"/>
            <line x1="85" y1="310" x2="85" y2="390" stroke="#475569" stroke-width="4" stroke-dasharray="8,8"/>
            <line x1="180" y1="310" x2="180" y2="390" stroke="#475569" stroke-width="4" stroke-dasharray="8,8"/>
          `
        },

        // Trục Trung Tâm
        {
          id: "f1_living",
          name: "Phòng Khách Chính (Lò Sưởi Đá)",
          shortName: "PHÒNG KHÁCH CHÍNH",
          x: 255, y: 45, w: 250, h: 115,
          archNote: "Trung tâm sưởi ấm của Tầng 1 với lò sưởi đá cẩm thạch lớn.",
          decor: `
            <rect x="340" y="45" width="80" height="14" fill="#7f1d1d" stroke="#ef4444" stroke-width="1"/>
            <text x="380" y="55" fill="#fca5a5" font-size="7.5" text-anchor="middle">🔥 LÒ SƯỞI</text>
            <rect x="315" y="85" width="130" height="45" rx="4" fill="none" stroke="#475569" stroke-width="1.2"/>
          `
        },
        {
          id: "f1_lib_west",
          name: "Thư Viện Tây (Đối Xứng)",
          shortName: "THƯ VIỆN TÂY",
          x: 230, y: 170, w: 95, h: 135,
          archNote: "Thiết kế đối xứng hoàn hảo với Thư Viện Đông qua Sảnh Đón Khách.",
          decor: `
            <line x1="240" y1="182" x2="240" y2="290" stroke="#475569" stroke-width="6" stroke-dasharray="12,3"/>
            <line x1="315" y1="182" x2="315" y2="290" stroke="#475569" stroke-width="6" stroke-dasharray="12,3"/>
          `
        },
        {
          id: "f1_grand_hall",
          name: "Sảnh Đón Khách (Grand Hall)",
          shortName: "SẢNH ĐÓN KHÁCH",
          x: 330, y: 170, w: 100, h: 155,
          savePoint: 1,
          archNote: "Đặt đồng hồ quả lắc lớn. Phía sau chân cầu thang chính là 🌹 Bình Hoa Hồng Đỏ (Save Point #1).",
          decor: `
            <rect x="352" y="178" width="56" height="32" fill="url(#stairs-pat)" stroke="#64748b" stroke-width="1"/>
            <circle cx="380" cy="285" r="16" fill="none" stroke="#475569" stroke-width="1.2"/>
          `
        },
        {
          id: "f1_lib_east",
          name: "Thư Viện Đông (Đối Xứng)",
          shortName: "THƯ VIỆN ĐÔNG",
          x: 435, y: 170, w: 95, h: 135,
          archNote: "Chứa hàng ngàn đầu sách cổ. Kệ sách gỗ sồi phía nam có kết cấu bất thường.",
          decor: `
            <line x1="445" y1="182" x2="445" y2="290" stroke="#475569" stroke-width="6" stroke-dasharray="12,3"/>
            <line x1="520" y1="182" x2="520" y2="290" stroke="#475569" stroke-width="6" stroke-dasharray="12,3"/>
          `
        },
        {
          id: "f1_secret",
          name: "Mật Thất Thư Viện Đông",
          shortName: "🕵️ MẬT THẤT T1",
          x: 435, y: 310, w: 95, h: 55,
          isSecret: true,
          archNote: "Khoang mật thất ẩn sau kệ sách xoay 90 độ của Thư Viện Đông (do kiến trúc sư Richard thiết kế)."
        },
        {
          id: "f1_maze",
          name: "Mê Cung Tuyết & Vườn Hoa Quý",
          shortName: "MÊ CUNG TUYẾT (NGOẠI CẢNH)",
          x: 230, y: 372, w: 300, h: 63,
          archNote: "Nằm trước Cửa Chính, hiện đã bị bão tuyết trắng xóa vùi lấp hoàn toàn, cô lập biệt thự.",
          decor: `
            <path d="M 250,385 H 320 V 420 M 440,385 H 510 V 420" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.45"/>
            <text x="380" y="384" fill="#93c5fd" font-size="7.5" text-anchor="middle">❄ CỬA CHÍNH BỊ TUYẾT PHONG TỎA ❄</text>
          `
        },

        // Cánh Phải
        {
          id: "f1_stairs_right",
          name: "Cầu Thang Cánh Phải (T1)",
          shortName: "THANG PHẢI",
          x: 545, y: 45, w: 165, h: 65,
          archNote: "Dẫn lên Sảnh Sinh Hoạt Chung (F2) và nhánh phải F3.",
          decor: `<rect x="560" y="55" width="135" height="24" fill="url(#stairs-pat)" stroke="#64748b" stroke-width="1"/>`
        },
        {
          id: "f1_pool",
          name: "Hồ Bơi & Phòng Thay Đồ",
          shortName: "HỒ BƠI TRONG NHÀ",
          x: 545, y: 120, w: 165, h: 115,
          archNote: "Nằm phía sau Sảnh Khiêu Vũ, mặt nước lạnh buốt phản chiếu ánh đèn mờ.",
          decor: `
            <rect x="565" y="140" width="125" height="75" rx="4" fill="#0c4a6e" fill-opacity="0.35" stroke="#0284c7" stroke-width="1.5"/>
          `
        },
        {
          id: "f1_ballroom",
          name: "Sảnh Khiêu Vũ (Giant Ballroom)",
          shortName: "SẢNH KHIÊU VŨ",
          x: 545, y: 245, w: 165, h: 120,
          archNote: "Sảnh rộng lát gỗ bóng loáng nằm ở Cánh Phải, thông trực tiếp với Sân Khấu Lớn.",
          decor: `
            <circle cx="627" cy="305" r="28" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="4,4"/>
          `
        },
        {
          id: "f1_stage",
          name: "Sân Khấu Lớn (Main Stage)",
          shortName: "SÂN KHẤU LỚN",
          x: 545, y: 365, w: 165, h: 70,
          archNote: "Bục sân khấu nhung đỏ nằm cuối Sảnh Khiêu Vũ.",
          decor: `
            <path d="M 555,375 Q 627,395 700,375" fill="none" stroke="#991b1b" stroke-width="2"/>
          `
        }
      ]
    },

    F2: {
      code: "F2",
      name: "TẦNG 2 — KHU CĂN HỘ KHÁCH (GUEST QUARTERS)",
      subtitle: "Hành lang hẹp dài nối liền 10 Căn Hộ Khách (#1–#10), Phòng Quản Gia & Sảnh Sinh Hoạt Chung",
      outline: "M 35,40 H 725 V 440 H 35 Z",
      corridors: [],
      rooms: [
        // Cánh Trái
        {
          id: "f2_stairs_left",
          name: "Cầu Thang Cánh Trái (T2)",
          shortName: "THANG TRÁI",
          x: 50, y: 60, w: 115, h: 90,
          archNote: "Nối xuống Bếp/Phòng Ăn (F1) và dẫn lên cửa sắt khóa của Tầng 3.",
          decor: `<rect x="62" y="75" width="90" height="26" fill="url(#stairs-pat)" stroke="#64748b" stroke-width="1"/>`
        },
        {
          id: "f2_butler",
          name: "Phòng Quản Gia Henry",
          shortName: "PHÒNG QUẢN GIA",
          x: 50, y: 160, w: 115, h: 260,
          archNote: "Nằm ngay đầu trái hành lang để quản gia trưởng Henry giám sát toàn bộ khách khứa.",
          decor: `<rect x="65" y="360" width="85" height="40" fill="none" stroke="#475569" stroke-width="1.2"/>`
        },

        // Dãy 5 Căn hộ phía Bắc (#1 -> #5)
        {
          id: "f2_secret",
          name: "Khoang Rỗng Sau Tủ Áo Phòng #1",
          shortName: "🕵️ KHOANG RỖNG P.1",
          x: 175, y: 45, w: 80, h: 42,
          isSecret: true,
          archNote: "Khoang rỗng bí mật nằm ngay sau vách tủ quần áo của Căn hộ Khách số 1."
        },
        {
          id: "f2_guest_1",
          name: "Căn Hộ Khách Số 1",
          shortName: "PHÒNG #1",
          x: 175, y: 92, w: 80, h: 108,
          archNote: "Căn hộ khách đầu tiên bên trái. Có phòng tắm khép kín và chốt gài bên trong."
        },
        {
          id: "f2_guest_2",
          name: "Căn Hộ Khách Số 2",
          shortName: "PHÒNG #2",
          x: 260, y: 92, w: 80, h: 108,
          archNote: "Căn hộ khách #2. Cửa gỗ sồi dày có chốt trong."
        },
        {
          id: "f2_guest_3",
          name: "Căn Hộ Khách Số 3",
          shortName: "PHÒNG #3",
          x: 345, y: 92, w: 80, h: 108,
          archNote: "Căn hộ khách #3. Có phòng vệ sinh khép kín."
        },
        {
          id: "f2_guest_4",
          name: "Căn Hộ Khách Số 4",
          shortName: "PHÒNG #4",
          x: 430, y: 92, w: 80, h: 108,
          archNote: "Căn hộ khách #4. Có phòng vệ sinh khép kín."
        },
        {
          id: "f2_guest_5",
          name: "Căn Hộ Khách Số 5",
          shortName: "PHÒNG #5",
          x: 515, y: 92, w: 80, h: 108,
          archNote: "Căn hộ khách #5 nằm sát Sảnh Sinh Hoạt Chung."
        },

        // Trục Hành Lang Dài
        {
          id: "f2_hallway",
          name: "Trục Hành Lang Dài (The Long Hallway)",
          shortName: "TRỤC HÀNH LANG DÀI (10 PHÒNG KHÁCH)",
          x: 175, y: 208, w: 420, h: 74,
          archNote: "Hành lang hẹp, thiếu sáng và ngột ngạt nối liền hai đầu cầu thang. Julian đã lén gắn camera siêu nhỏ ở góc khuất.",
          decor: `
            <line x1="190" y1="245" x2="580" y2="245" stroke="#475569" stroke-width="1" stroke-dasharray="8,6"/>
          `
        },

        // Dãy 5 Căn hộ phía Nam (#6 -> #10)
        {
          id: "f2_guest_6",
          name: "Căn Hộ Khách Số 6",
          shortName: "PHÒNG #6",
          x: 175, y: 290, w: 80, h: 130,
          archNote: "Căn hộ khách #6 đối diện Phòng #1."
        },
        {
          id: "f2_guest_7",
          name: "Căn Hộ Khách Số 7",
          shortName: "PHÒNG #7",
          x: 260, y: 290, w: 80, h: 130,
          archNote: "Căn hộ khách #7 đối diện Phòng #2."
        },
        {
          id: "f2_guest_8",
          name: "Căn Hộ Khách Số 8",
          shortName: "PHÒNG #8",
          x: 345, y: 290, w: 80, h: 130,
          archNote: "Căn hộ khách #8 ở giữa dãy hành lang phía nam."
        },
        {
          id: "f2_guest_9",
          name: "Căn Hộ Khách Số 9",
          shortName: "PHÒNG #9",
          x: 430, y: 290, w: 80, h: 130,
          archNote: "Căn hộ khách #9."
        },
        {
          id: "f2_guest_10",
          name: "Căn Hộ Khách Số 10",
          shortName: "PHÒNG #10",
          x: 515, y: 290, w: 80, h: 130,
          archNote: "Căn hộ khách #10 ở cuối dãy phía nam."
        },

        // Đầu Phải
        {
          id: "f2_stairs_right",
          name: "Cầu Thang Cánh Phải (T2)",
          shortName: "THANG PHẢI",
          x: 605, y: 60, w: 105, h: 90,
          archNote: "Nối xuống Cánh Phải (F1) và dẫn lên nhánh phải Tầng 3.",
          decor: `<rect x="615" y="75" width="85" height="26" fill="url(#stairs-pat)" stroke="#64748b" stroke-width="1"/>`
        },
        {
          id: "f2_lounge",
          name: "Sảnh Sinh Hoạt Chung (Common Lounge)",
          shortName: "SẢNH CHUNG F2",
          x: 605, y: 160, w: 105, h: 260,
          savePoint: 2,
          archNote: "Nằm ở đầu phải hành lang. Trên bàn phụ có đặt 🌹 Bình Hoa Hồng Đỏ (Save Point #2)."
        }
      ]
    },

    F3: {
      code: "F3",
      name: "TẦNG 3 — KHU GIA CHỦ HẠN CHẾ (HOST QUARTERS)",
      subtitle: "Khu vực cấm của vợ chồng Arthur & Diana • Toàn bộ cửa đều bị khóa chặt từ đầu",
      outline: "M 35,40 H 725 V 440 H 35 Z",
      corridors: [
        `<rect x="365" y="60" width="30" height="360" fill="#090d16" stroke="#334155" stroke-width="1.5"/>`
      ],
      rooms: [
        // Nhánh Trái
        {
          id: "f3_stairs_left",
          name: "Cầu Thang Trái (T3)",
          shortName: "THANG TRÁI",
          x: 50, y: 60, w: 110, h: 85,
          lockedByDefault: true,
          archNote: "Cửa chắn cầu thang lên Nhánh Trái Tầng 3 bị khóa."
        },
        {
          id: "f3_master",
          name: "2 Phòng Ngủ Master (Arthur & Diana)",
          shortName: "2 PHÒNG MASTER",
          x: 170, y: 60, w: 185, h: 170,
          lockedByDefault: true,
          archNote: "Phòng ngủ xa hoa của vợ chồng chủ nhà Arthur và Diana.",
          decor: `
            <rect x="190" y="80" width="65" height="80" fill="none" stroke="#475569" stroke-width="1.2"/>
            <rect x="275" y="80" width="65" height="80" fill="none" stroke="#475569" stroke-width="1.2"/>
          `
        },
        {
          id: "f3_vip",
          name: "Phòng Khách VIP (VIP Lounge)",
          shortName: "PHÒNG KHÁCH VIP",
          x: 50, y: 155, w: 110, h: 265,
          lockedByDefault: true,
          archNote: "Phòng tiếp khách mật của Arthur ở Nhánh Trái."
        },
        {
          id: "f3_kids",
          name: "Phòng Ngủ Trẻ Em (Kids Room)",
          shortName: "PHÒNG TRẺ EM",
          x: 170, y: 240, w: 185, h: 115,
          lockedByDefault: true,
          archNote: "Phòng trẻ em bỏ không phủ đầy bụi. Có một tủ đồ chơi cũ kỹ kê sát vách tường nam."
        },
        {
          id: "f3_secret",
          name: "Lối Ngầm Phòng Trẻ Em",
          shortName: "🕵️ LỐI NGẦM PHÒNG TRẺ EM",
          x: 170, y: 362, w: 185, h: 58,
          isSecret: true,
          archNote: "Mật đạo thứ 3 nằm ẩn phía sau chiếc tủ đồ chơi bám bụi trong Phòng Trẻ Em."
        },

        // Nhánh Phải
        {
          id: "f3_office",
          name: "Phòng Làm Việc của Arthur (Két Sắt)",
          shortName: "PHÒNG LÀM VIỆC ARTHUR",
          x: 405, y: 60, w: 185, h: 170,
          lockedByDefault: true,
          archNote: "Phòng làm việc riêng của Arthur, bên trong có két sắt âm tường chứa tài liệu tống tiền.",
          decor: `<rect x="460" y="105" width="75" height="40" fill="none" stroke="#475569" stroke-width="1.5"/>`
        },
        {
          id: "f3_stairs_right",
          name: "Cầu Thang Phải (T3)",
          shortName: "THANG PHẢI",
          x: 600, y: 60, w: 110, h: 85,
          lockedByDefault: true,
          archNote: "Cầu thang dẫn từ Tầng 2 lên Nhánh Phải Tầng 3 và thông lên Tầng 4."
        },
        {
          id: "f3_reading",
          name: "Phòng Đọc Sách (Reading Room)",
          shortName: "PHÒNG ĐỌC SÁCH",
          x: 405, y: 240, w: 185, h: 180,
          savePoint: 3,
          lockedByDefault: true,
          archNote: "Cạnh khung cửa sổ vòm có đặt 🌹 Bình Hoa Hồng Đỏ (Save Point #3)."
        },
        {
          id: "f3_locked_library",
          name: "Thư Viện Khép Kín (Private Library)",
          shortName: "THƯ VIỆN KHÉP KÍN",
          x: 600, y: 155, w: 110, h: 130,
          lockedByDefault: true,
          archNote: "Thư viện tư nhân bị khóa hai lớp của gia chủ."
        },
        {
          id: "f3_gym",
          name: "Phòng Gym & Spa",
          shortName: "PHÒNG GYM & SPA",
          x: 600, y: 295, w: 110, h: 125,
          lockedByDefault: true,
          archNote: "Khu tập thể hình và xông hơi riêng trên Tầng 3."
        }
      ]
    },

    F4: {
      code: "F4",
      name: "TẦNG 4 — GIẢI TRÍ & TÂM LINH (ROOFTOP & SPIRITUAL)",
      subtitle: "Tầng áp mái & sân thượng • Tháp Chuông, Vườn Phong Lan Độc & Thiền Viện Bí Mật",
      outline: "M 35,40 H 725 V 440 H 35 Z",
      corridors: [],
      rooms: [
        // Khu Trái
        {
          id: "f4_bell_tower",
          name: "Tháp Chuông (Bell Tower)",
          shortName: "THÁP CHUÔNG",
          x: 50, y: 60, w: 155, h: 170,
          archNote: "Điểm cao nhất của biệt thự nhìn thẳng xuống vực núi tuyết sâu thẳm.",
          decor: `
            <circle cx="127" cy="145" r="34" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,2"/>
            <circle cx="127" cy="145" r="8" fill="#64748b"/>
          `
        },
        {
          id: "f4_cinema",
          name: "Phòng Chiếu Phim Cách Âm",
          shortName: "PHÒNG CHIẾU PHIM",
          x: 50, y: 245, w: 155, h: 175,
          archNote: "Bọc mút tiêu âm dày đặc; tiếng hét bên trong hoàn toàn không thể lọt ra ngoài."
        },

        // Khu Giữa
        {
          id: "f4_bar",
          name: "Quán Bar Tầng Thượng",
          shortName: "QUÁN BAR",
          x: 220, y: 60, w: 155, h: 110,
          archNote: "Quầy rượu sang trọng nằm phía bắc Sảnh Chờ."
        },
        {
          id: "f4_karaoke",
          name: "Phòng Karaoke",
          shortName: "PHÒNG KARAOKE",
          x: 385, y: 60, w: 155, h: 110,
          archNote: "Phòng hát giải trí cách âm nằm cạnh Quán Bar."
        },
        {
          id: "f4_waiting_hall",
          name: "Sảnh Chờ Hẹp Trung Tâm",
          shortName: "SẢNH CHỜ TRUNG TÂM",
          x: 220, y: 182, w: 320, h: 105,
          savePoint: 4,
          archNote: "Nằm kẹp giữa Quán Bar và 2 Phòng Game. Chính giữa sảnh đặt 🌹 Bình Hoa Hồng Đỏ (Save Point #4)."
        },
        {
          id: "f4_games",
          name: "2 Phòng Chơi Game (Billiards & Poker)",
          shortName: "2 PHÒNG GAME (BI-A / POKER)",
          x: 220, y: 300, w: 320, h: 120,
          archNote: "Gồm phòng bàn Bi-a và phòng bài Poker thông nhau.",
          decor: `
            <line x1="380" y1="300" x2="380" y2="420" stroke="#475569" stroke-width="1.5" stroke-dasharray="6,4"/>
            <rect x="265" y="340" width="70" height="40" fill="none" stroke="#475569" stroke-width="1.5"/>
            <circle cx="460" cy="360" r="24" fill="none" stroke="#475569" stroke-width="1.5"/>
          `
        },

        // Khu Phải
        {
          id: "f4_greenhouse",
          name: "Vườn Thượng Uyển (Nhà Kính Lan Độc)",
          shortName: "VƯỜN THƯỢNG UYỂN",
          x: 555, y: 60, w: 155, h: 215,
          archNote: "Nhà kính trồng các giống phong lan quý hiếm có chứa độc tố thần kinh tự nhiên (mục tiêu của Sarah).",
          decor: `
            <line x1="555" y1="110" x2="710" y2="110" stroke="#1e293b" stroke-width="1"/>
            <line x1="555" y1="160" x2="710" y2="160" stroke="#1e293b" stroke-width="1"/>
            <line x1="555" y1="210" x2="710" y2="210" stroke="#1e293b" stroke-width="1"/>
          `
        },
        {
          id: "f4_zen_temple",
          name: "Thiền Viện Bí Mật (Secret Zen Temple)",
          shortName: "THIỀN VIỆN BÍ MẬT",
          x: 555, y: 290, w: 155, h: 130,
          archNote: "Nối với Vườn Thượng Uyển qua một lối đá hẹp. Không gian tĩnh mịch nồng mùi trầm hương cổ."
        }
      ]
    }
  };

  // 3. CSS GIAO DIỆN CLINICAL BLUEPRINT & HIỆU ỨNG LÀM MỜ PHÒNG KHÓA
  const STYLES = `
    :root {
      --bg- abyss: #05070b;
      --bg-panel: #0b101b;
      --bg-card: #111827;
      --line-blueprint: #1e293b;
      --wall-stroke: #64748b;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --crimson: #dc2626;
      --crimson-glow: rgba(220, 38, 38, 0.45);
      --gold: #f59e0b;
      --cyan: #38bdf8;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 12px;
      background-color: var(--bg-abyss);
      color: var(--text-main);
      font-family: 'Courier New', Consolas, monospace;
      user-select: none;
      -webkit-font-smoothing: antialiased;
    }
    .cm-wrapper {
      max-width: 900px;
      margin: 0 auto;
      background: var(--bg-panel);
      border: 1px solid #334155;
      border-top: 3px solid var(--crimson);
      border-radius: 6px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.85);
      overflow: hidden;
    }
    /* HEADER TELEMETRY */
    .cm-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: linear-gradient(90deg, #0f172a 0%, #1a080c 100%);
      border-bottom: 1px solid #1e293b;
      gap: 10px;
    }
    .cm-title-box {
      display: flex;
      flex-direction: column;
    }
    .cm-title {
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1.5px;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cm-subtitle {
      font-size: 11px;
      color: #fca5a5;
      margin-top: 3px;
      font-style: italic;
    }
    .cm-telemetry {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .cm-badge {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid #334155;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      color: #e2e8f0;
    }
    .cm-badge.temp-cold {
      border-color: #0284c7;
      color: #7dd3fc;
    }
    .cm-badge.temp-freezing {
      border-color: var(--crimson);
      color: #fca5a5;
      animation: pulseRed 2s infinite;
    }

    /* FLOOR TABS */
    .cm-tabs {
      display: flex;
      background: #070a12;
      border-bottom: 1px solid #1e293b;
      overflow-x: auto;
    }
    .cm-tab {
      flex: 1;
      min-width: 95px;
      padding: 10px 8px;
      background: transparent;
      color: var(--text-muted);
      border: none;
      border-right: 1px solid #1e293b;
      border-bottom: 3px solid transparent;
      font-family: inherit;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .cm-tab:hover {
      background: rgba(51, 65, 85, 0.25);
      color: #fff;
    }
    .cm-tab.active {
      background: rgba(220, 38, 38, 0.12);
      color: #fff;
      border-bottom-color: var(--crimson);
    }
    .cm-dot-here {
      width: 7px;
      height: 7px;
      background: #ef4444;
      border-radius: 50%;
      box-shadow: 0 0 8px #ef4444;
    }

    /* BLUEPRINT STAGE */
    .cm-stage-header {
      padding: 8px 16px;
      background: #090d16;
      border-bottom: 1px solid #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }
    .cm-floor-label {
      font-size: 13px;
      font-weight: bold;
      color: var(--cyan);
      letter-spacing: 0.5px;
    }
    .cm-floor-desc {
      font-size: 11px;
      color: var(--text-muted);
    }
    .cm-canvas-wrap {
      position: relative;
      width: 100%;
      background: #060a12;
      border-bottom: 1px solid #1e293b;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
    }
    svg.cm-svg {
      width: 100%;
      height: auto;
      max-height: 460px;
      display: block;
    }

    /* SVG ROOM STATES */
    .cm-room-group {
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .cm-room-group:hover .cm-room-box {
      stroke: #cbd5e1;
      stroke-width: 2.2px;
      fill: rgba(51, 65, 85, 0.35);
    }
    .cm-room-box {
      fill: rgba(15, 23, 42, 0.78);
      stroke: #475569;
      stroke-width: 1.5px;
      transition: all 0.25s ease;
    }
    /* Phòng đã có dữ liệu khám phá */
    .cm-room-group.visited .cm-room-box {
      fill: rgba(30, 41, 59, 0.82);
      stroke: #64748b;
    }
    /* Phòng hiện tại của User & Charles */
    .cm-room-group.current-room .cm-room-box {
      fill: rgba(153, 27, 27, 0.28);
      stroke: #ef4444;
      stroke-width: 2.5px;
      filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.5));
    }
    /* Phòng đang được click xem thông tin */
    .cm-room-group.selected-room .cm-room-box {
      stroke: #38bdf8;
      stroke-width: 2.5px;
    }
    /* PHÒNG BỊ KHÓA (Chưa có trong unlockedRooms) */
    .cm-room-group.is-locked .cm-room-interior {
      filter: blur(1.6px) brightness(0.45);
      opacity: 0.35;
    }
    .cm-room-group.is-locked .cm-room-box {
      fill: url(#locked-hatch);
      stroke: #334155;
      stroke-dasharray: 5, 3;
    }
    /* MẬT ĐẠO (Chỉ hiển thị khi có trong unlockedSecrets) */
    .cm-room-group.is-secret .cm-room-box {
      fill: rgba(120, 53, 15, 0.32);
      stroke: #f59e0b;
      stroke-width: 2px;
      stroke-dasharray: 6, 3;
      animation: pulseSecret 2.5s infinite;
    }

    /* LEGEND BAR */
    .cm-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      padding: 8px 16px;
      background: #080c14;
      border-bottom: 1px solid #1e293b;
      font-size: 11px;
      color: var(--text-muted);
    }
    .cm-legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .cm-swatch {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
    }

    /* FORENSIC INSPECTOR PANEL */
    .cm-inspector {
      padding: 14px 16px;
      background: #0b0f19;
    }
    .cm-insp-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 8px;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .cm-insp-title {
      font-size: 14px;
      font-weight: bold;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cm-status-pill {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 3px;
      font-weight: bold;
    }
    .pill-current { background: rgba(220, 38, 38, 0.2); color: #fca5a5; border: 1px solid #dc2626; }
    .pill-locked { background: rgba(51, 65, 85, 0.4); color: #cbd5e1; border: 1px solid #475569; }
    .pill-secret { background: rgba(245, 158, 11, 0.2); color: #fcd34d; border: 1px solid #f59e0b; }
    .pill-visited { background: rgba(2, 132, 199, 0.2); color: #7dd3fc; border: 1px solid #0284c7; }

    .cm-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 10px;
    }
    .cm-card {
      background: var(--bg-card);
      border: 1px solid #1e293b;
      border-left: 3px solid #475569;
      padding: 9px 12px;
      border-radius: 4px;
    }
    .cm-card.card-see { border-left-color: #ef4444; }
    .cm-card.card-hear { border-left-color: #38bdf8; }
    .cm-card.card-who { border-left-color: #10b981; }
    .cm-card.card-clue { border-left-color: #f59e0b; }
    .cm-card-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin-bottom: 4px;
      font-weight: bold;
    }
    .cm-card-val {
      font-size: 12.5px;
      line-height: 1.5;
      color: #f1f5f9;
    }
    .cm-locked-banner {
      padding: 16px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px dashed #475569;
      border-radius: 4px;
      text-align: center;
      color: #94a3b8;
      font-size: 12.5px;
      line-height: 1.6;
    }

    @keyframes pulseRed {
      0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
      50% { box-shadow: 0 0 10px 2px rgba(220, 38, 38, 0.75); }
    }
    @keyframes pulseSecret {
      0%, 100% { stroke-opacity: 1; }
      50% { stroke-opacity: 0.45; }
    }
  `;

  // 4. HÀM KHỞI TẠO CHÍNH: initCrookedMap(config)
  function initCrookedMap(rawConfig) {
    const config = rawConfig || {};
    const activeRoomId = normalizeId(config.activeRoomId || "f1_grand_hall");

    // Chuẩn hóa danh sách phòng đã mở khóa & mật đạo đã phát hiện
    const unlockedRoomsSet = new Set(
      (Array.isArray(config.unlockedRooms) ? config.unlockedRooms : []).map(normalizeId)
    );
    // Nếu người chơi đang đứng trực tiếp trong phòng đó thì mặc định coi như đã mở khóa
    if (activeRoomId) unlockedRoomsSet.add(activeRoomId);

    const unlockedSecretsSet = new Set(
      (Array.isArray(config.unlockedSecrets) ? config.unlockedSecrets : []).map(normalizeId)
    );
    // Nếu người chơi đang đứng trong mật thất thì tự động hiện mật thất đó
    if (activeRoomId === "f1_secret" || activeRoomId === "f2_secret" || activeRoomId === "f3_secret") {
      unlockedSecretsSet.add(activeRoomId);
    }

    // Chuẩn hóa dữ liệu trinh sát các phòng từ config.rooms
    const normalizedRoomsData = {};
    if (config.rooms && typeof config.rooms === "object") {
      Object.keys(config.rooms).forEach((k) => {
        const normKey = normalizeId(k);
        normalizedRoomsData[normKey] = config.rooms[k];
      });
    }

    // Xác định tầng hiện tại dựa trên currentFloor hoặc suy ra từ activeRoomId
    let initialFloor = (config.currentFloor || "F1").toUpperCase().trim();
    if (!MANOR_BLUEPRINT[initialFloor]) {
      const prefix = activeRoomId.split("_")[0].toUpperCase();
      initialFloor = MANOR_BLUEPRINT[prefix] ? prefix : "F1";
    }

    let currentViewFloor = initialFloor;
    let selectedRoomId = activeRoomId;

    // Tiêm CSS
    if (!document.getElementById("crooked-map-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "crooked-map-styles";
      styleEl.textContent = STYLES;
      document.head.appendChild(styleEl);
    }

    // Tạo container chính
    let root = document.getElementById("crooked-map-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "crooked-map-root";
      document.body.appendChild(root);
    }

    // Kiểm tra phòng có đang bị khóa hay không
    function isRoomLocked(roomDef) {
      if (!roomDef.lockedByDefault) return false;
      return !unlockedRoomsSet.has(roomDef.id);
    }

    // Kiểm tra mật đạo có được phép hiển thị hay không (Ẩn 100% nếu chưa khám phá)
    function isSecretVisible(roomDef) {
      if (!roomDef.isSecret) return true;
      return unlockedSecretsSet.has(roomDef.id);
    }

    // Kiểm tra xem phòng có hiện trường máu / thi thể không
    function hasBloodAlert(roomId) {
      const data = normalizedRoomsData[roomId];
      if (!data || !data.see) return false;
      return /🩸|xác|thi thể|máu|án mạng|tử vong/i.test(data.see);
    }

    // Tìm thông tin định nghĩa phòng theo ID
    function findRoomDef(roomId) {
      for (const flKey of Object.keys(MANOR_BLUEPRINT)) {
        const found = MANOR_BLUEPRINT[flKey].rooms.find((r) => r.id === roomId);
        if (found) return { floor: flKey, room: found };
      }
      return null;
    }

    // Render SVG mặt bằng cho tầng được chọn
    function buildFloorSVG(floorKey) {
      const floor = MANOR_BLUEPRINT[floorKey];
      if (!floor) return "";

      let roomsSvg = "";

      floor.rooms.forEach((r) => {
        // QUY TẮC TỐI THƯỢNG: Ẩn hoàn toàn Mật Đạo nếu chưa có trong unlockedSecrets
        if (!isSecretVisible(r)) {
          return;
        }

        const locked = isRoomLocked(r);
        const isCurrent = r.id === activeRoomId;
        const isSelected = r.id === selectedRoomId;
        const hasData = Boolean(normalizedRoomsData[r.id]);
        const bloodAlert = !locked && hasBloodAlert(r.id);

        const classes = [
          "cm-room-group",
          locked ? "is-locked" : "",
          r.isSecret ? "is-secret" : "",
          isCurrent ? "current-room" : "",
          isSelected ? "selected-room" : "",
          hasData ? "visited" : ""
        ]
          .filter(Boolean)
          .join(" ");

        const cx = r.x + r.w / 2;
        const cy = r.y + r.h / 2;

        // Nhãn phụ hiển thị bên dưới tên phòng
        let badgesSvg = "";

        if (locked) {
          // Hiển thị ổ khóa rõ nét đè lên trên lớp nền bị làm mờ
          badgesSvg += `
            <g transform="translate(${cx}, ${cy + 10})">
              <rect x="-36" y="-10" width="72" height="18" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1"/>
              <text x="0" y="3" fill="#cbd5e1" font-size="9.5" font-weight="bold" text-anchor="middle">🔒 ĐÃ KHÓA</text>
            </g>
          `;
        } else {
          // Nếu phòng đã mở, hiển thị Save Point (🌹), Vị trí người chơi (📍), hoặc Cảnh báo máu (🩸)
          if (r.savePoint) {
            badgesSvg += `
              <text x="${r.x + r.w - 12}" y="${r.y + 16}" font-size="12" text-anchor="middle" title="Điểm Lưu Trữ Hoa Hồng Đỏ">🌹</text>
            `;
          }
          if (bloodAlert) {
            badgesSvg += `
              <text x="${r.x + 14}" y="${r.y + 16}" font-size="12" text-anchor="middle">🩸</text>
            `;
          }
          if (isCurrent) {
            badgesSvg += `
              <g transform="translate(${cx}, ${cy + 14})">
                <rect x="-48" y="-9" width="96" height="17" rx="8" fill="#dc2626" stroke="#fca5a5" stroke-width="1"/>
                <text x="0" y="3" fill="#ffffff" font-size="8.5" font-weight="bold" text-anchor="middle">📍 BẠN & CHARLES</text>
              </g>
            `;
          }
        }

        roomsSvg += `
          <g class="${classes}" data-room-id="${r.id}">
            <rect class="cm-room-box" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2"/>
            <g class="cm-room-interior">
              ${r.decor || ""}
              <text x="${cx}" y="${locked ? cy - 6 : cy - 2}"
                    fill="${r.isSecret ? "#fcd34d" : isCurrent ? "#ffffff" : "#cbd5e1"}"
                    font-size="${r.w < 95 ? "8.5" : "10"}"
                    font-weight="bold"
                    text-anchor="middle">
                ${r.shortName}
              </text>
            </g>
            ${badgesSvg}
          </g>
        `;
      });

      return `
        <svg class="cm-svg" viewBox="0 0 760 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Lưới Blueprint Kỹ Thuật -->
            <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#111c2d" stroke-width="0.8"/>
            </pattern>
            <!-- Sọc chéo cho Phòng Bị Khóa -->
            <pattern id="locked-hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="rgba(9, 13, 22, 0.88)"/>
              <line x1="0" y1="0" x2="0" y2="10" stroke="#1e293b" stroke-width="3"/>
            </pattern>
            <!-- Bậc cầu thang -->
            <pattern id="stairs-pat" width="6" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#475569" stroke-width="1.5"/>
            </pattern>
          </defs>

          <!-- Nền Blueprint -->
          <rect width="760" height="480" fill="#060a12"/>
          <rect width="760" height="480" fill="url(#bp-grid)"/>

          <!-- La bàn & Thước đo tỷ lệ kiến trúc -->
          <g transform="translate(725, 32)" opacity="0.65">
            <circle cx="0" cy="0" r="14" fill="none" stroke="#64748b" stroke-width="1"/>
            <path d="M 0,-12 L 4,4 L 0,1 L -4,4 Z" fill="#ef4444"/>
            <text x="0" y="-16" fill="#94a3b8" font-size="8" font-weight="bold" text-anchor="middle">N</text>
          </g>
          <text x="16" y="468" fill="#475569" font-size="9">ARCHITECT: RICHARD • SCALE 1:100 • CROOKED MANOR BLUEPRINT</text>

          <!-- Khung tường bao ngoại vi của tầng -->
          <path d="${floor.outline}" fill="#090e1a" stroke="#475569" stroke-width="4"/>
          <path d="${floor.outline}" fill="none" stroke="#94a3b8" stroke-width="1" opacity="0.4"/>

          <!-- Hành lang & Đường ống ngầm -->
          ${(floor.corridors || []).join("\n")}

          <!-- Danh sách các phòng -->
          ${roomsSvg}
        </svg>
      `;
    }

    // Render Bảng Trinh Sát Hiện Trường (Forensic Inspector)
    function buildInspectorHTML(roomId) {
      const found = findRoomDef(roomId);
      if (!found) {
        return `<div class="cm-locked-banner">Hãy chọn một khu vực trên sơ đồ để xem dữ liệu trinh sát.</div>`;
      }

      const { floor, room } = found;
      // Nếu là mật đạo chưa mở khóa thì ẩn hoàn toàn
      if (!isSecretVisible(room)) {
        return `<div class="cm-locked-banner">Khu vực không xác định trên bản vẽ công khai.</div>`;
      }

      const locked = isRoomLocked(room);
      const isCurrent = room.id === activeRoomId;
      const roomData = normalizedRoomsData[room.id];

      // TRƯỜNG HỢP 1: PHÒNG ĐANG BỊ KHÓA (Chưa có trong unlockedRooms)
      if (locked) {
        return `
          <div class="cm-insp-head">
            <div class="cm-insp-title">
              <span>🔒 ${room.name}</span>
            </div>
            <span class="cm-status-pill pill-locked">KHU VỰC BỊ KHÓA (${floor})</span>
          </div>
          <div class="cm-locked-banner">
            <strong>[CỬA KHU VỰC ĐANG BỊ KHÓA CHẶT]</strong><br/>
            ${room.archNote}<br/>
            <span style="color:#fca5a5; font-size:11.5px;">
              ※ Tầm nhìn và âm thanh bên trong bị phong tỏa hoàn toàn. Cần tìm đúng chìa khóa (từ Quản gia Henry, Thợ máy Logan, lục soát hiện trường) hoặc nhờ Greg bẻ khóa để tiếp cận.
            </span>
          </div>
        `;
      }

      // TRƯỜNG HỢP 2: PHÒNG ĐÃ MỞ KHÓA
      let statusBadge = `<span class="cm-status-pill pill-visited">TẦNG ${floor}</span>`;
      if (isCurrent) {
        statusBadge = `<span class="cm-status-pill pill-current">📍 VỊ TRÍ HIỆN TẠI CỦA BẠN & CHARLES</span>`;
      } else if (room.isSecret) {
        statusBadge = `<span class="cm-status-pill pill-secret">🕵️ MẬT ĐẠO ĐÃ PHÁT HIỆN</span>`;
      }

      const hearText = roomData && roomData.hear
        ? roomData.hear
        : (isCurrent ? "Tiếng gió tuyết rít ngoài khung cửa và nhịp thở trầm tĩnh của Charles." : "Ngoài tầm nghe trực tiếp từ vị trí hiện tại (Sương mù nhận thức).");

      const seeText = roomData && roomData.see
        ? roomData.see
        : room.archNote + (room.savePoint ? " Tại đây có đặt 🌹 Bình Hoa Hồng Đỏ (Điểm Lưu Trữ)." : "");

      const whoList = roomData && Array.isArray(roomData.who) && roomData.who.length > 0
        ? roomData.who.join(", ")
        : (isCurrent ? "Bạn, Charles" : "Chưa rõ nhân sự bên trong (Cần trực tiếp bước vào kiểm tra)");

      const clueText = roomData && roomData.clue
        ? roomData.clue
        : (room.savePoint
            ? "🌹 Có thể gõ lệnh /save khi đứng tại phòng này để lưu tiến trình sinh tồn."
            : "Chưa ghi nhận vật chứng mới. Sử dụng lệnh /khampha khi ở trong phòng để lục soát sâu hơn.");

      return `
        <div class="cm-insp-head">
          <div class="cm-insp-title">
            <span>${room.savePoint ? "🌹 " : ""}${room.name}</span>
          </div>
          ${statusBadge}
        </div>
        <div class="cm-grid">
          <div class="cm-card card-see">
            <div class="cm-card-label">👁️ QUAN SÁT HIỆN TRẠNG (SEE)</div>
            <div class="cm-card-val">${seeText}</div>
          </div>
          <div class="cm-card card-hear">
            <div class="cm-card-label">👂 ÂM THANH GHI NHẬN (HEAR)</div>
            <div class="cm-card-val">${hearText}</div>
          </div>
          <div class="cm-card card-who">
            <div class="cm-card-label">👥 NHÂN SỰ TẠI KHU VỰC (WHO)</div>
            <div class="cm-card-val">${whoList}</div>
          </div>
          <div class="cm-card card-clue">
            <div class="cm-card-label">🔍 GHI CHÚ TRINH SÁT & KIẾN TRÚC (CLUE)</div>
            <div class="cm-card-val">${clueText}</div>
          </div>
        </div>
      `;
    }

    // Render toàn bộ giao diện
    function renderAll() {
      const floorObj = MANOR_BLUEPRINT[currentViewFloor];
      const tempNum = parseFloat(String(config.temp || "15").replace(/[^\d.-]/g, ""));
      const tempClass = tempNum <= 2 ? "temp-freezing" : "temp-cold";

      const tabsHtml = ["B1", "F1", "F2", "F3", "F4"]
        .map((fl) => {
          const isPlayerFloor = fl === initialFloor;
          const isActiveTab = fl === currentViewFloor;
          // Đếm số mật đạo đã mở ở tầng này (nếu có)
          const hasDiscoveredSecretOnFloor = MANOR_BLUEPRINT[fl].rooms.some(
            (r) => r.isSecret && unlockedSecretsSet.has(r.id)
          );
          return `
            <button class="cm-tab ${isActiveTab ? "active" : ""}" data-floor="${fl}">
              ${isPlayerFloor ? `<span class="cm-dot-here" title="Bạn đang ở tầng này"></span>` : ""}
              <span>TẦNG ${fl}</span>
              ${fl === "F3" && !unlockedRoomsSet.has("f3_office") ? `<span>🔒</span>` : ""}
              ${hasDiscoveredSecretOnFloor ? `<span title="Đã phát hiện mật đạo">🕵️</span>` : ""}
            </button>
          `;
        })
        .join("");

      root.innerHTML = `
        <div class="cm-wrapper">
          <!-- HEADER -->
          <div class="cm-header">
            <div class="cm-title-box">
              <div class="cm-title">
                <span>🏛️ BẢN VẼ KỸ THUẬT: BIỆT THỰ RỪNG THẲM</span>
              </div>
              <div class="cm-subtitle">${config.atmosphere || "Bão tuyết phong tỏa • Mọi đường dây liên lạc đã bị cắt đứt"}</div>
            </div>
            <div class="cm-telemetry">
              <div class="cm-badge">📅 NGÀY ${config.day || "1/5"}</div>
              <div class="cm-badge">⏳ ${config.time || "18:00"}</div>
              <div class="cm-badge ${tempClass}">🌡️ ${config.temp || "15°C"}</div>
            </div>
          </div>

          <!-- TABS CHUYỂN TẦNG -->
          <div class="cm-tabs">
            ${tabsHtml}
          </div>

          <!-- TIÊU ĐỀ TẦNG -->
          <div class="cm-stage-header">
            <div class="cm-floor-label">${floorObj.name}</div>
            <div class="cm-floor-desc">${floorObj.subtitle}</div>
          </div>

          <!-- BẢN VẼ SVG -->
          <div class="cm-canvas-wrap">
            ${buildFloorSVG(currentViewFloor)}
          </div>

          <!-- CHÚ GIẢI -->
          <div class="cm-legend">
            <div class="cm-legend-item">
              <span class="cm-swatch" style="background:rgba(220,38,38,0.45); border:1.5px solid #ef4444;"></span>
              <span>Vị trí của Bạn & Charles</span>
            </div>
            <div class="cm-legend-item">
              <span class="cm-swatch" style="background:#0f172a; border:1px dashed #475569;"></span>
              <span>🔒 Phòng bị khóa (Làm mờ nội thất)</span>
            </div>
            <div class="cm-legend-item">
              <span>🌹 Điểm Lưu Trữ (Save Point)</span>
            </div>
            ${
              unlockedSecretsSet.size > 0
                ? `<div class="cm-legend-item">
                     <span class="cm-swatch" style="background:rgba(120,53,15,0.4); border:1.5px dashed #f59e0b;"></span>
                     <span>🕵️ Mật đạo đã khám phá (${unlockedSecretsSet.size}/3)</span>
                   </div>`
                : ""
            }
          </div>

          <!-- BẢNG CHI TIẾT TRINH SÁT -->
          <div class="cm-inspector" id="cm-inspector-box">
            ${buildInspectorHTML(selectedRoomId)}
          </div>
        </div>
      `;

      // Gắn sự kiện chuyển tầng
      root.querySelectorAll(".cm-tab").forEach((btn) => {
        btn.addEventListener("click", function () {
          const targetFloor = this.getAttribute("data-floor");
          if (targetFloor && MANOR_BLUEPRINT[targetFloor]) {
            currentViewFloor = targetFloor;
            // Tự động chọn phòng đầu tiên (không phải mật đạo đang ẩn) của tầng đó để hiển thị
            const visibleRooms = MANOR_BLUEPRINT[targetFloor].rooms.filter(isSecretVisible);
            const playerRoomOnFloor = visibleRooms.find((r) => r.id === activeRoomId);
            selectedRoomId = playerRoomOnFloor
              ? playerRoomOnFloor.id
              : (visibleRooms[0] ? visibleRooms[0].id : "");
            renderAll();
          }
        });
      });

      // Gắn sự kiện click vào từng phòng trên SVG
      root.querySelectorAll(".cm-room-group").forEach((grp) => {
        grp.addEventListener("click", function () {
          const rId = this.getAttribute("data-room-id");
          if (rId) {
            selectedRoomId = rId;
            renderAll();
          }
        });
      });
    }

    renderAll();
  }

  // Xuất hàm ra phạm vi toàn cục để lệnh /map gọi trực tiếp
  global.initCrookedMap = initCrookedMap;
})(window);
