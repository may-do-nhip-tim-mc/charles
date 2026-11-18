// FILE: engine.js (V2.0 - WIZAMAP 2.5D ARCHITECTURAL BLUEPRINT & MOBILE RESPONSIVE)
(function () {
  const CSS = `
    * { box-sizing: border-box; user-select: none; -webkit-tap-highlight-color: transparent; }
    body {
      margin: 0; background: #1a120e; color: #2b2119;
      font-family: 'Georgia', 'Times New Roman', serif;
      height: 100vh; width: 100vw; display: flex; flex-direction: column; overflow: hidden;
    }
    /* HEADER BAR */
    .topbar {
      background: #2b1a14; color: #f3e9d2; min-height: 42px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 6px 12px; border-bottom: 2px solid #73533d; flex-shrink: 0; gap: 8px;
    }
    .brand { font-size: 14px; letter-spacing: 2px; font-weight: bold; color: #e8d0a9; white-space: nowrap; }
    .atmo-quote {
      font-style: italic; font-size: 11.5px; color: #d8c3a5; text-align: center;
      flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .clock-box { text-align: right; font-family: 'Courier New', monospace; font-size: 11px; line-height: 1.25; color: #f3e9d2; white-space: nowrap; }

    /* RESPONSIVE MAIN WRAP (Desktop: Side-by-Side | Mobile: Map Top, Info Bottom) */
    .main-wrap { display: flex; flex: 1; overflow: hidden; background: #efe4ce; flex-direction: row; }
    @media (max-width: 768px) {
      .main-wrap { flex-direction: column; }
      .map-viewport { height: 54% !important; min-height: 250px; border-bottom: 2px solid #b89f80; }
      .inspector { width: 100% !important; height: 46% !important; border-left: none !important; padding: 12px 14px !important; }
    }

    /* MAP VIEWPORT */
    .map-viewport {
      flex: 1; position: relative; overflow: hidden;
      background: radial-gradient(circle at center, #f6ecda 0%, #dfd0b5 100%);
      cursor: grab; touch-action: none;
    }
    .map-viewport:active { cursor: grabbing; }
    .floor-crumb {
      position: absolute; top: 8px; left: 10px; z-index: 10;
      font-size: 10px; letter-spacing: 1.2px; color: #5c4633; font-weight: bold;
      background: rgba(245,235,214,0.88); padding: 3px 7px; border-radius: 3px;
      border: 1px solid #c9b497; pointer-events: none;
    }
    .floor-tabs {
      position: absolute; top: 34px; left: 10px; z-index: 10;
      display: flex; gap: 4px; flex-wrap: wrap;
    }
    .floor-btn {
      background: #ebd9be; border: 1px solid #8c735b; color: #3d2f24;
      padding: 4px 8px; font-family: inherit; font-size: 10.5px; font-weight: bold;
      cursor: pointer; border-radius: 3px; box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }
    .floor-btn.active { background: #3b231a; color: #f5ebd6; border-color: #1f110c; }

    .zoom-controls {
      position: absolute; top: 68px; left: 10px; z-index: 10;
      display: flex; flex-direction: column; gap: 4px;
    }
    .ctrl-btn {
      width: 28px; height: 28px; background: rgba(245,235,214,0.95); border: 1px solid #8c735b;
      color: #3d2f24; font-size: 15px; font-weight: bold; cursor: pointer; border-radius: 3px;
      display: flex; align-items: center; justify-content: center;
    }
    .legend-bar {
      position: absolute; bottom: 8px; right: 10px; z-index: 10;
      background: rgba(245,235,214,0.92); border: 1px solid #c2ab8c;
      padding: 3px 8px; border-radius: 3px; font-size: 10px; color: #4a3828;
      display: flex; gap: 8px; align-items: center; pointer-events: none;
    }
    .go-btn {
      position: absolute; bottom: 8px; left: 10px; z-index: 10;
      background: #3b231a; border: 1px solid #8c735b; color: #f5ebd6;
      padding: 6px 14px; font-weight: bold; letter-spacing: 1px;
      cursor: pointer; font-family: inherit; font-size: 11px; border-radius: 3px;
    }

    /* INSPECTOR PANEL */
    .inspector {
      width: 330px; background: #f3e9d7; border-left: 1px solid #c8b496;
      padding: 16px; display: flex; flex-direction: column; gap: 8px;
      overflow-y: auto; flex-shrink: 0;
    }
    .ins-crumb { font-size: 11px; color: #7a5c43; font-weight: bold; }
    .ins-title { font-size: 19px; font-weight: bold; color: #231912; margin: 0; }
    .ins-sub { font-size: 11.5px; font-style: italic; color: #7a2020; margin-bottom: 2px; }
    .divider { height: 1px; background: #d4c2a8; margin: 2px 0; }
    .sec-label {
      font-size: 11px; font-weight: bold; letter-spacing: 1px;
      color: #5a3e2b; text-transform: uppercase; margin-top: 4px;
    }
    .sec-text { font-size: 13px; line-height: 1.45; color: #2f241d; margin: 2px 0 0 0; }
    .badge-wrap { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 3px; }
    .npc-badge {
      background: #8b2626; color: #fff; font-size: 11.5px; font-weight: bold;
      padding: 3px 8px; border-radius: 3px; display: inline-flex; align-items: center; gap: 4px;
    }
    .npc-badge.ally { background: #264b62; }
    .room-chip {
      background: #e6d6bc; border: 1px solid #9e8466; color: #36281d;
      font-size: 11px; padding: 3px 8px; border-radius: 3px; cursor: pointer; font-family: inherit;
    }
    .room-chip.active { background: #3b231a; color: #f5ebd6; font-weight: bold; }
    .cmd-toast {
      display: none; font-size: 11px; background: #2c1d18; color: #f3e9d2;
      padding: 6px 8px; border-radius: 3px; font-family: monospace;
    }

    /* SVG ELEMENTS */
    svg { width: 100%; height: 100%; display: block; }
    .room-node { cursor: pointer; }
    .room-node:hover .room-floor { filter: brightness(0.95); }
    .room-node.selected .room-border { stroke: #1e5aa8 !important; stroke-width: 4 !important; }
    .rose-pulse { animation: pulseRose 1.8s infinite alternate; }
    @keyframes pulseRose {
      0% { filter: drop-shadow(0 0 2px #ff2a2a); }
      100% { filter: drop-shadow(0 0 7px #ff0000); }
    }
  `;

  // SƠ ĐỒ KIẾN TRÚC 5 TẦNG + TỌA ĐỘ NỘI THẤT & CHẬU HOA HỒNG (rx, ry)
  const BASE_LAYOUT = {
    B1: {
      title: "TẦNG HẦM B1 • KỸ THUẬT, HẦM RƯỢU & LÒ SƯỞI",
      corridors: [{ x:225, y:190, w:430, h:85, label:"HÀNH LANG ĐƯỜNG ỐNG NGẦM" }],
      rooms: [
        { id:"b1_stairs", name:"Cầu Thang Hầm", sub:"Tầng Hầm B1 • Lối lên Nhà Bếp F1", x:55, y:80, w:170, h:115, type:"stairs" },
        { id:"b1_pipe", name:"Hành Lang Đường Ống", sub:"Tầng Hầm B1 • Trục Dẫn Nhiệt", x:225, y:190, w:430, h:85, type:"corridor" },
        { id:"b1_wine", name:"Hầm Rượu Vang Cổ", sub:"Tầng Hầm B1 • Khu Trái", x:55, y:210, w:170, h:210, type:"storage" },
        { id:"b1_pantry", name:"Kho Thực Phẩm Lạnh", sub:"Tầng Hầm B1 • Khu Bắc", x:250, y:55, w:380, h:135, type:"storage" },
        { id:"b1_boiler", name:"Phòng Lò Sưởi & Máy Phát", sub:"Tầng Hầm B1 • Khu Phải (Logan)", x:655, y:75, w:195, h:345, type:"boiler", restricted:true }
      ]
    },
    F1: {
      title: "TẦNG 1 • SẢNH CHÍNH, THƯ VIỆN & SẢNH KHIÊU VŨ",
      corridors: [{ x:195, y:265, w:510, h:45, label:"HÀNH LANG ĐẠI SẢNH TẦNG 1" }],
      rooms: [
        { id:"f1_garden", name:"Mê Cung & Vườn Hoa", sub:"Ngoại Cảnh Trước Cửa Chính", x:325, y:445, w:250, h:85, type:"garden" },
        { id:"f1_grand_hall", name:"Sảnh Đón Khách", sub:"Tầng 1 • Trục Chính (🌹 Bình Hoa Cạnh Cầu Thang)", x:335, y:275, w:230, h:165, type:"hall",
          save:true, rosePos:{ rx:495, ry:310, note:"Chậu hoa hồng đỏ đặt trên đôn gỗ ngay góc sau cầu thang chính" } },
        { id:"f1_living", name:"Phòng Khách Chính", sub:"Tầng 1 • Trục Chính (Lò Sưởi Lớn)", x:335, y:100, w:230, h:165, type:"lounge" },
        { id:"f1_lib_w", name:"Thư Viện Tây", sub:"Tầng 1 • Cánh Trái Trục Chính", x:200, y:125, w:135, h:150, type:"library" },
        { id:"f1_lib_e", name:"Thư Viện Đông", sub:"Tầng 1 • Cánh Phải Trục Chính", x:565, y:125, w:135, h:150, type:"library" },
        { id:"f1_dining", name:"Phòng Ăn Lớn", sub:"Tầng 1 • Cánh Trái", x:50, y:185, w:150, h:170, type:"dining" },
        { id:"f1_kitchen", name:"Nhà Bếp (Cửa xuống B1)", sub:"Tầng 1 • Cánh Trái (Martha)", x:50, y:55, w:150, h:130, type:"kitchen" },
        { id:"f1_stairs_l", name:"Cầu Thang Cánh Trái", sub:"Tầng 1 • Đầu Cánh Trái", x:50, y:355, w:150, h:85, type:"stairs" },
        { id:"f1_ballroom", name:"Sảnh Khiêu Vũ & Sân Khấu", sub:"Tầng 1 • Cánh Phải", x:700, y:180, w:160, h:175, type:"ballroom" },
        { id:"f1_pool", name:"Hồ Bơi & Phòng Thay Đồ", sub:"Tầng 1 • Sau Sảnh Khiêu Vũ", x:700, y:55, w:160, h:125, type:"pool" },
        { id:"f1_stairs_r", name:"Cầu Thang Cánh Phải", sub:"Tầng 1 • Đầu Cánh Phải", x:700, y:355, w:160, h:85, type:"stairs" },
        { id:"f1_secret", name:"Mật Thất Thư Viện Đông", sub:"Tầng 1 • Mật Đạo Sau Kệ Sách", x:565, y:45, w:135, h:75, type:"secret", secret:true }
      ]
    },
    F2: {
      title: "TẦNG 2 • DÃY 10 CĂN HỘ KHÁCH & PHÒNG QUẢN GIA",
      corridors: [{ x:145, y:225, w:595, h:75, label:"HÀNH LANG DÀI TẦNG 2" }],
      rooms: [
        { id:"f2_stairs_l", name:"Cầu Thang Trái (T2)", sub:"Tầng 2 • Đầu Trái", x:45, y:215, w:100, h:105, type:"stairs" },
        { id:"f2_butler", name:"Phòng Quản Gia Henry", sub:"Tầng 2 • Cạnh Cầu Thang Trái", x:45, y:85, w:125, h:130, type:"office" },
        { id:"f2_hallway", name:"Hành Lang Dài Tầng 2", sub:"Tầng 2 • Trục Trung Tâm", x:145, y:225, w:595, h:75, type:"corridor" },
        { id:"f2_r1_2", name:"Căn Hộ Khách #1 & #2", sub:"Tầng 2 • Dãy Bắc Đầu Trái", x:170, y:85, w:135, h:140, type:"bedroom" },
        { id:"f2_r3_5", name:"Căn Hộ Khách #3, #4, #5", sub:"Tầng 2 • Dãy Bắc Giữa", x:305, y:85, w:255, h:140, type:"bedroom" },
        { id:"f2_r6_8", name:"Căn Hộ Khách #6, #7, #8", sub:"Tầng 2 • Dãy Nam Trái", x:170, y:300, w:265, h:140, type:"bedroom" },
        { id:"f2_r9_10", name:"Căn Hộ Khách #9 & #10", sub:"Tầng 2 • Dãy Nam Phải", x:435, y:300, w:175, h:140, type:"bedroom" },
        { id:"f2_lounge", name:"Sảnh Sinh Hoạt Chung", sub:"Tầng 2 • Đầu Phải (🌹 Bình Hoa Bàn Trà)", x:560, y:85, w:180, h:140, type:"lounge",
          save:true, rosePos:{ rx:695, ry:135, note:"Chậu hoa hồng đỏ đặt trên bàn trà nhỏ sát vách phải" } },
        { id:"f2_stairs_r", name:"Cầu Thang Phải (T2)", sub:"Tầng 2 • Đầu Phải", x:740, y:215, w:115, h:105, type:"stairs" },
        { id:"f2_secret", name:"Khoang Rỗng Phòng #1", sub:"Tầng 2 • Mật Đạo Sau Tủ Áo", x:170, y:30, w:135, h:55, type:"secret", secret:true }
      ]
    },
    F3: {
      title: "TẦNG 3 • KHU GIA CHỦ ARTHUR & DIANA (HẠN CHẾ)",
      corridors: [{ x:395, y:195, w:95, h:80, label:"SẢNH NỐI T3" }],
      rooms: [
        { id:"f3_master", name:"2 Phòng Ngủ Master", sub:"Tầng 3 • Nhánh Trái (Cấm địa)", x:65, y:80, w:330, h:145, type:"bedroom", restricted:true },
        { id:"f3_kids", name:"Phòng Ngủ Trẻ Em", sub:"Tầng 3 • Nhánh Trái (Cấm địa)", x:65, y:235, w:165, h:155, type:"bedroom", restricted:true },
        { id:"f3_vip", name:"Phòng Khách VIP", sub:"Tầng 3 • Nhánh Trái", x:230, y:235, w:165, h:155, type:"lounge", restricted:true },
        { id:"f3_office", name:"Phòng Làm Việc Arthur", sub:"Tầng 3 • Nhánh Phải (Cấm địa)", x:490, y:80, w:190, h:150, type:"office", restricted:true },
        { id:"f3_reading", name:"Phòng Đọc Sách", sub:"Tầng 3 • Nhánh Phải (🌹 Bình Hoa Cửa Sổ)", x:680, y:80, w:165, h:150, type:"library",
          save:true, rosePos:{ rx:810, ry:125, note:"Chậu hoa hồng đỏ đặt trên bệ cửa sổ vòm phía Đông" } },
        { id:"f3_priv_lib", name:"Thư Viện Khép Kín", sub:"Tầng 3 • Nhánh Phải", x:490, y:235, w:190, h:155, type:"library", restricted:true },
        { id:"f3_gym", name:"Phòng Gym & Spa", sub:"Tầng 3 • Nhánh Phải", x:680, y:235, w:165, h:155, type:"pool" },
        { id:"f3_secret", name:"Lối Ngầm Phòng Trẻ Em", sub:"Tầng 3 • Mật Đạo Sau Tủ Đồ Chơi", x:65, y:395, w:165, h:60, type:"secret", secret:true }
      ]
    },
    F4: {
      title: "TẦNG 4 • GIẢI TRÍ, THÁP CHUÔNG & THIỀN VIỆN",
      corridors: [],
      rooms: [
        { id:"f4_bell", name:"Tháp Chuông", sub:"Tầng 4 • Khu Trái", x:55, y:75, w:195, h:165, type:"stairs" },
        { id:"f4_cinema", name:"Phòng Chiếu Phim", sub:"Tầng 4 • Khu Trái (Cách âm)", x:55, y:245, w:195, h:175, type:"lounge" },
        { id:"f4_bar", name:"Quán Bar Tầng 4", sub:"Tầng 4 • Khu Giữa Phía Bắc", x:260, y:75, w:355, h:115, type:"dining" },
        { id:"f4_wait", name:"Sảnh Chờ Trung Tâm", sub:"Tầng 4 • Khu Giữa (🌹 Bình Hoa Giữa Sảnh)", x:260, y:190, w:355, h:110, type:"hall",
          save:true, rosePos:{ rx:437, ry:245, note:"Chậu hoa hồng đỏ đặt trên bệ đá chính giữa Sảnh Chờ" } },
        { id:"f4_games", name:"2 Phòng Game & Karaoke", sub:"Tầng 4 • Khu Giữa Phía Nam", x:260, y:300, w:355, h:120, type:"lounge" },
        { id:"f4_garden", name:"Vườn Thượng Uyển", sub:"Tầng 4 • Khu Phải (Hoa lan độc)", x:625, y:75, w:220, h:165, type:"garden" },
        { id:"f4_zen", name:"Thiền Viện Bí Mật", sub:"Tầng 4 • Cuối Đường Hẹp Khu Phải", x:625, y:255, w:220, h:165, type:"secret", restricted:true }
      ]
    }
  };

  // VẼ ĐỒ ĐẠC NỘI THẤT TRONG PHÒNG GIỐNG WIZAMAP IMAGE 2
  function drawInteriorProps(r) {
    const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
    let svg = "";
    // Vẽ cạnh tường 3D phía trên mỗi phòng
    svg += `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="12" fill="#7a6248" opacity="0.85"/>`;

    if (r.type === "hall" || r.type === "ballroom") {
      // Thảm đỏ lớn ở giữa phòng
      svg += `<rect x="${r.x+24}" y="${r.y+26}" width="${r.w-48}" height="${r.h-44}" rx="4" fill="#9e3b33" opacity="0.35" stroke="#6e221c" stroke-width="1.5"/>`;
    } else if (r.type === "dining") {
      // Bàn tiệc dài + ghế xung quanh
      svg += `<rect x="${cx-36}" y="${cy-16}" width="72" height="32" rx="3" fill="#8b6543" stroke="#4d3520" stroke-width="1.5"/>`;
      for (let dx = -26; dx <= 26; dx += 26) {
        svg += `<rect x="${cx+dx-5}" y="${cy-24}" width="10" height="6" fill="#a6805b"/>`;
        svg += `<rect x="${cx+dx-5}" y="${cy+18}" width="10" height="6" fill="#a6805b"/>`;
      }
    } else if (r.type === "library" || r.type === "office") {
      // Kệ sách dọc tường + Bàn đọc sách
      svg += `<rect x="${r.x+8}" y="${r.y+16}" width="${r.w-16}" height="8" fill="#63462d"/>`;
      svg += `<rect x="${cx-22}" y="${cy-10}" width="44" height="22" fill="#8f6b4a" stroke="#4d3520" stroke-width="1.2"/>`;
      svg += `<rect x="${cx-8}" y="${cy-6}" width="16" height="12" fill="#f3e9d2"/>`;
    } else if (r.type === "bedroom") {
      // Giường ngủ + gối
      svg += `<rect x="${r.x+16}" y="${r.y+20}" width="38" height="48" rx="3" fill="#b85d57" stroke="#5e322f" stroke-width="1.5"/>`;
      svg += `<rect x="${r.x+20}" y="${r.y+24}" width="30" height="12" rx="2" fill="#f3e9d2"/>`;
      if (r.w > 180) {
        svg += `<rect x="${r.x+r.w-54}" y="${r.y+20}" width="38" height="48" rx="3" fill="#577894" stroke="#2f435e" stroke-width="1.5"/>`;
        svg += `<rect x="${r.x+r.w-50}" y="${r.y+24}" width="30" height="12" rx="2" fill="#f3e9d2"/>`;
      }
    } else if (r.type === "stairs") {
      // Các bậc cầu thang
      for (let i = 0; i < 5; i++) {
        svg += `<rect x="${r.x+18 + i*12}" y="${r.y+22}" width="10" height="${r.h-36}" fill="#9c7e5e" stroke="#5c4630" stroke-width="1"/>`;
      }
    } else if (r.type === "pool") {
      svg += `<rect x="${r.x+18}" y="${r.y+22}" width="${r.w-36}" height="${r.h-36}" rx="6" fill="#7ab3bd" opacity="0.55" stroke="#3c737d" stroke-width="1.5"/>`;
    } else if (r.type === "garden") {
      svg += `<circle cx="${r.x+35}" cy="${cy}" r="16" fill="#5a7d4c" opacity="0.5"/>`;
      svg += `<circle cx="${r.x+r.w-35}" cy="${cy}" r="16" fill="#5a7d4c" opacity="0.5"/>`;
    }

    // VẼ VỊ TRÍ CHÍNH XÁC CỦA CHẬU HOA HỒNG (🌹 SAVE POINT) TRÊN MAP
    if (r.save && r.rosePos) {
      const { rx, ry } = r.rosePos;
      svg += `
        <g class="rose-pulse">
          <circle cx="${rx}" cy="${ry}" r="13" fill="#fff3d1" stroke="#8b0000" stroke-width="2"/>
          <text x="${rx}" y="${ry+5}" text-anchor="middle" font-size="14">🌹</text>
        </g>
      `;
    }
    return svg;
  }

  window.initCrookedMap = function (state) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    document.body.innerHTML = `
      <div class="topbar">
        <div class="brand">CROOKED MAP</div>
        <div class="atmo-quote">${state.atmosphere || "Bão tuyết gầm rú ngoài khung kính; bóng tối bao trùm Biệt Thự Rừng Thẳm."}</div>
        <div class="clock-box">
          <div><b>${state.time || "18:00"}</b> | 🌡️ ${state.temp || "15°C"}</div>
          <div>Ngày ${state.day || "1/5"}</div>
        </div>
      </div>

      <div class="main-wrap">
        <!-- KHU VỰC SƠ ĐỒ BẢN ĐỒ (CÓ ĐỒ HỌA PHÒNG ỐC) -->
        <div class="map-viewport" id="viewport">
          <div class="floor-crumb" id="floorCrumb"></div>
          <div class="floor-tabs">
            <button class="floor-btn" data-f="B1">HẦM B1</button>
            <button class="floor-btn" data-f="F1">TẦNG 1</button>
            <button class="floor-btn" data-f="F2">TẦNG 2</button>
            <button class="floor-btn" data-f="F3">TẦNG 3</button>
            <button class="floor-btn" data-f="F4">TẦNG 4</button>
          </div>
          <div class="zoom-controls">
            <button class="ctrl-btn" id="zIn">+</button>
            <button class="ctrl-btn" id="zOut">−</button>
            <button class="ctrl-btn" id="zReset">⤢</button>
          </div>
          <button class="go-btn" id="goBtn">TỚI PHÒNG NÀY</button>
          <div class="legend-bar">
            <span>🌹 Chậu Hoa Hồng (Save)</span>
            <span>👣 Có Người</span>
            <span>🔒 Cấm Địa</span>
          </div>

          <svg id="mapSvg" viewBox="0 0 900 550" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="woodGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <rect width="24" height="24" fill="#d8c3a5"/>
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#c7b091" stroke-width="1"/>
              </pattern>
              <pattern id="tileGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#cbd4d6"/>
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#b4c0c2" stroke-width="1.2"/>
              </pattern>
            </defs>
            <g id="mapStage"></g>
          </svg>
        </div>

        <!-- BẢNG THÔNG TIN CHI TIẾT BÊN DƯỚI / BÊN PHẢI -->
        <div class="inspector">
          <div class="ins-crumb">📍 <span id="insFloor"></span></div>
          <h3 class="ins-title" id="insName"></h3>
          <div class="ins-sub" id="insRoseNote"></div>
          <div class="divider"></div>

          <div class="sec-label">👥 1. AI ĐANG Ở ĐÓ</div>
          <div class="badge-wrap" id="insWho"></div>

          <div class="sec-label">👂 NGHE HÓNG & 👁️ QUAN SÁT</div>
          <p class="sec-text" id="insHearSee"></p>

          <div class="sec-label">🚪 2. CÁC PHÒNG / VỊ TRÍ CÙNG TẦNG (CHỌN NHANH)</div>
          <div class="badge-wrap" id="insRoomList"></div>

          <div class="cmd-toast" id="cmdToast"></div>
        </div>
      </div>
    `;

    let curFloor = state.currentFloor || "F1";
    let curRoomId = state.activeRoomId || "f1_grand_hall";
    let scale = 1, panX = 0, panY = 0, dragging = false, sx = 0, sy = 0;
    const stage = document.getElementById("mapStage");

    function getRoomInfo(r) {
      const ov = (state.rooms && state.rooms[r.id]) || {};
      return {
        ...r,
        hear: ov.hear || "Tiếng gió tuyết rít qua khe cửa gỗ sồi.",
        see: ov.see || "Không gian tĩnh lặng dưới ánh đèn vàng vọt.",
        who: ov.who || [],
        clue: ov.clue || ""
      };
    }

    function render(fKey) {
      curFloor = fKey;
      const fLayout = BASE_LAYOUT[fKey] || BASE_LAYOUT.F1;
      document.getElementById("floorCrumb").textContent = fLayout.title;
      document.querySelectorAll(".floor-btn").forEach(b => b.classList.toggle("active", b.dataset.f === fKey));

      // Nền sàn tổng của cả tầng
      let html = `<rect x="38" y="38" width="832" height="495" rx="6" fill="#e6d6bc" stroke="#7d6347" stroke-width="5"/>`;

      const visibleRooms = fLayout.rooms.filter(r => !r.secret || (state.unlockedSecrets || []).includes(r.id));

      visibleRooms.forEach(raw => {
        const r = getRoomInfo(raw);
        const isSel = r.id === curRoomId;
        const fillPat = (r.type === "corridor" || r.type === "pool") ? "url(#tileGrid)" : "url(#woodGrid)";
        const cx = r.x + r.w / 2, cy = r.y + r.h / 2;

        // Băng-rôn hiển thị AI ĐANG Ở ĐÓ ngay trên phòng (giống WIZAMAP)
        let whoBanner = "";
        if (r.who && r.who.length > 0) {
          const label = r.who[0] + (r.who.length > 1 ? ` +${r.who.length - 1}` : "");
          const bw = Math.min(r.w - 10, Math.max(82, label.length * 6.2));
          const bgCol = r.who.join().includes("Charles") ? "#224d69" : "#8f2424";
          whoBanner = `
            <rect x="${cx - bw/2}" y="${r.y + r.h - 24}" width="${bw}" height="18" rx="3" fill="${bgCol}" stroke="#f5ebd6" stroke-width="1"/>
            <text x="${cx}" y="${r.y + r.h - 11.5}" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">👣 ${label}</text>
          `;
        }

        html += `
          <g class="room-node ${isSel ? "selected" : ""}" data-rid="${r.id}">
            <rect class="room-floor room-border" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}"
                  fill="${fillPat}" stroke="${r.restricted ? "#8b3a3a" : "#69513a"}" stroke-width="3"/>
            ${drawInteriorProps(r)}
            <rect x="${cx - Math.min(r.w/2 - 6, 72)}" y="${cy - 13}" width="${Math.min(r.w - 12, 144)}" height="20" rx="3" fill="rgba(246,236,218,0.88)"/>
            <text x="${cx}" y="${cy + 1}" text-anchor="middle" fill="#2b1e14" font-size="11" font-weight="bold">
              ${r.restricted ? "🔒 " : ""}${r.name}
            </text>
            ${whoBanner}
          </g>
        `;
      });

      stage.innerHTML = html;

      // Gắn sự kiện click cho từng phòng trên bản đồ
      stage.querySelectorAll(".room-node").forEach(node => {
        node.onclick = () => {
          curRoomId = node.getAttribute("data-rid");
          const target = getRoomInfo(visibleRooms.find(x => x.id === curRoomId));
          render(fKey);
          inspect(target, visibleRooms);
        };
      });

      // Cập nhật danh sách nút bấm chọn nhanh các phòng trong tầng
      const listWrap = document.getElementById("insRoomList");
      listWrap.innerHTML = "";
      visibleRooms.forEach(raw => {
        const info = getRoomInfo(raw);
        const btn = document.createElement("button");
        btn.className = "room-chip" + (info.id === curRoomId ? " active" : "");
        btn.textContent = `${info.save ? "🌹 " : ""}${info.name}${info.who.length ? " (" + info.who.length + ")" : ""}`;
        btn.onclick = () => {
          curRoomId = info.id;
          render(fKey);
          inspect(info, visibleRooms);
        };
        listWrap.appendChild(btn);
      });
    }

    function inspect(r) {
      document.getElementById("insFloor").textContent = r.sub;
      document.getElementById("insName").textContent = r.name;
      document.getElementById("insRoseNote").textContent = r.save && r.rosePos
        ? `🌹 Vị trí Chậu Hoa Hồng: ${r.rosePos.note} (Có thể gõ /save)`
        : (r.restricted ? "🔒 Khu vực hạn chế của Gia chủ" : "Khu vực trong Biệt Thự Rừng Thẳm");

      document.getElementById("insHearSee").innerHTML =
        `<b>• Nghe hóng:</b> ${r.hear}<br><b>• Quan sát:</b> ${r.see}${r.clue ? "<br><b>• Ghi chú:</b> " + r.clue : ""}`;

      const w = document.getElementById("insWho");
      w.innerHTML = r.who && r.who.length
        ? r.who.map(p => `<span class="npc-badge ${p.includes("Charles") ? "ally" : ""}">👣 ${p}</span>`).join("")
        : `<span style="font-size:12.5px;color:#7a6652;font-style:italic;">Không có ai ở phòng này trong tầm mắt</span>`;
    }

    document.querySelectorAll(".floor-btn").forEach(b => b.onclick = () => {
      const f = b.dataset.f;
      const first = getRoomInfo(BASE_LAYOUT[f].rooms[0]);
      curRoomId = first.id;
      render(f);
      inspect(first);
    });

    const sync = () => stage.setAttribute("transform", `translate(${panX},${panY}) scale(${scale})`);
    document.getElementById("zIn").onclick = () => { scale = Math.min(1.9, scale + 0.2); sync(); };
    document.getElementById("zOut").onclick = () => { scale = Math.max(0.65, scale - 0.2); sync(); };
    document.getElementById("zReset").onclick = () => { scale = 1; panX = 0; panY = 0; sync(); };

    // Hỗ trợ kéo bản đồ bằng cả Chuột và Ngón tay trên điện thoại
    const vp = document.getElementById("viewport");
    vp.onpointerdown = e => {
      if (e.target.closest("button") || e.target.closest(".room-node")) return;
      dragging = true; sx = e.clientX - panX; sy = e.clientY - panY;
      vp.setPointerCapture(e.pointerId);
    };
    vp.onpointermove = e => { if (dragging) { panX = e.clientX - sx; panY = e.clientY - sy; sync(); } };
    vp.onpointerup = () => dragging = false;

    document.getElementById("goBtn").onclick = () => {
      const r = BASE_LAYOUT[curFloor].rooms.find(x => x.id === curRoomId) || BASE_LAYOUT[curFloor].rooms[0];
      const cmd = `Di chuyển tới [${r.name}] (${curFloor}) và quan sát xung quanh.`;
      navigator.clipboard?.writeText(cmd);
      const t = document.getElementById("cmdToast");
      t.style.display = "block"; t.textContent = `Đã chép lệnh di chuyển: "${cmd}"`;
      setTimeout(() => t.style.display = "none", 3000);
    };

    const initF = BASE_LAYOUT[curFloor] ? curFloor : "F1";
    const startRoom = getRoomInfo(BASE_LAYOUT[initF].rooms.find(x => x.id === curRoomId) || BASE_LAYOUT[initF].rooms[1]);
    curRoomId = startRoom.id;
    render(initF);
    inspect(startRoom);
  };
})();
