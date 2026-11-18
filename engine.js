// FILE: engine.js (Upload file này lên GitHub Repository Public của bạn)
(function () {
  const CSS = `
    * { box-sizing: border-box; user-select: none; }
    body { margin: 0; background: #12100e; color: #2b231d; font-family: 'Georgia', serif; height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
    .topbar { background: #2c1d18; color: #f3e9d2; height: 48px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 2px solid #6b4c3b; flex-shrink: 0; }
    .brand { font-size: 18px; letter-spacing: 3px; font-weight: bold; color: #e6d2b5; }
    .atmo-quote { font-style: italic; font-size: 13px; color: #d8c3a5; text-align: center; max-width: 52%; }
    .clock-box { text-align: right; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.3; color: #f3e9d2; }
    .main-wrap { display: flex; flex: 1; overflow: hidden; background: #efe4ce; }
    .map-viewport { flex: 1; position: relative; overflow: hidden; background: radial-gradient(circle, #f5ebd6 0%, #decbb1 100%); cursor: grab; }
    .map-viewport:active { cursor: grabbing; }
    .floor-crumb { position: absolute; top: 14px; left: 18px; z-index: 10; font-size: 12px; letter-spacing: 2px; color: #6e5a47; font-weight: bold; text-transform: uppercase; pointer-events: none; }
    .floor-tabs { position: absolute; top: 12px; right: 16px; z-index: 10; display: flex; gap: 5px; }
    .floor-btn { background: #e8d8bc; border: 1px solid #8c735b; color: #3d2f24; padding: 5px 10px; font-family: inherit; font-size: 11.5px; font-weight: bold; cursor: pointer; border-radius: 3px; }
    .floor-btn.active, .floor-btn:hover { background: #3b231a; color: #f5ebd6; }
    .zoom-controls { position: absolute; top: 50px; left: 18px; z-index: 10; display: flex; flex-direction: column; gap: 5px; }
    .ctrl-btn { width: 32px; height: 32px; background: #f5ebd6; border: 1px solid #9c8468; color: #3d2f24; font-size: 16px; font-weight: bold; cursor: pointer; }
    .go-btn { position: absolute; bottom: 16px; left: 18px; z-index: 10; background: #f5ebd6; border: 1px solid #8c735b; color: #2b231d; padding: 9px 22px; font-weight: bold; letter-spacing: 1.5px; cursor: pointer; font-family: inherit; font-size: 13px; }
    .go-btn:hover { background: #3b231a; color: #fff; }
    .map-hint { position: absolute; bottom: 16px; right: 18px; z-index: 10; font-size: 12px; font-style: italic; color: #7a6652; pointer-events: none; }
    .inspector { width: 320px; background: #f2e8d5; border-left: 1px solid #c8b496; padding: 20px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; flex-shrink: 0; }
    .ins-crumb { font-size: 12px; color: #7a5c43; font-weight: bold; }
    .ins-title { font-size: 21px; font-weight: bold; color: #231912; margin: 2px 0; }
    .ins-sub { font-size: 12.5px; font-style: italic; color: #6e5a47; }
    .divider { height: 1px; background: #d4c2a8; margin: 4px 0; }
    .sec-label { font-size: 11.5px; font-weight: bold; letter-spacing: 1.5px; color: #5a3e2b; text-transform: uppercase; margin-top: 4px; }
    .sec-text { font-size: 13.5px; line-height: 1.55; color: #2f241d; margin: 2px 0 0 0; }
    .badge-wrap { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .npc-badge { background: #8b2626; color: #fff; font-size: 11.5px; font-weight: bold; padding: 4px 9px; border-radius: 2px; }
    .npc-badge.ally { background: #2b5876; }
    .cmd-toast { display: none; font-size: 11.5px; background: #2c1d18; color: #f3e9d2; padding: 8px; border-radius: 4px; font-family: monospace; }
    svg { width: 100%; height: 100%; display: block; }
    .room-group { cursor: pointer; }
    .room-rect { fill: #d6c3a5; stroke: #7d654d; stroke-width: 3; transition: 0.15s; }
    .room-group:hover .room-rect { fill: #cbb28c; stroke: #4a3525; }
    .room-group.selected .room-rect { fill: #c3d1d6; stroke: #2b5876; stroke-width: 3.5; }
    .room-group.restricted .room-rect { fill: #cfb8b0; }
    .room-group.secret .room-rect { fill: #d9a7a7; stroke: #8b0000; stroke-dasharray: 5,3; }
    .furn { fill: #9c8267; stroke: #5e4936; stroke-width: 1.5; }
    .room-label { font-size: 11px; font-weight: bold; fill: #3b2b1e; text-anchor: middle; pointer-events: none; }
    .pin-tag { fill: #8b2626; rx: 3; }
    .pin-text { font-size: 9.5px; fill: #fff; font-weight: bold; text-anchor: middle; pointer-events: none; }
  `;

  // Sơ đồ kiến trúc cố định 5 Tầng (B1 -> F4)
  const BASE_LAYOUT = {
    B1: {
      title: "BIỆT THỰ RỪNG THẲM • TẦNG HẦM (B1 - KỸ THUẬT, HẦM RƯỢU & LÒ SƯỞI)",
      rooms: [
        { id:"b1_stairs", name:"Cầu Thang Hầm (Từ Bếp)", sub:"Tầng Hầm • Lối Xuống Duy Nhất", x:65, y:80, w:155, h:115 },
        { id:"b1_pipe", name:"Hành Lang Đường Ống", sub:"Tầng Hầm • Trục Dẫn Nhiệt", x:235, y:190, w:410, h:90 },
        { id:"b1_wine", name:"Hầm Rượu Vang Cổ", sub:"Tầng Hầm • Khu Trái", x:65, y:215, w:155, h:200 },
        { id:"b1_pantry", name:"Kho Thực Phẩm Lạnh", sub:"Tầng Hầm • Khu Bắc", x:260, y:60, w:360, h:115 },
        { id:"b1_boiler", name:"Phòng Lò Sưởi & Máy Phát", sub:"Tầng Hầm • Khu Phải (Logan)", x:660, y:90, w:180, h:325, restricted:true }
      ]
    },
    F1: {
      title: "BIỆT THỰ RỪNG THẲM • TẦNG 1 (MẶT ĐẤT - TIẾP ĐÓN & DỊCH VỤ)",
      rooms: [
        { id:"f1_garden", name:"Mê Cung & Vườn Hoa", sub:"Ngoại cảnh • Cổng Biệt Thự", x:330, y:455, w:240, h:85 },
        { id:"f1_grand_hall", name:"Sảnh Đón Khách", sub:"Tầng 1 • Trục Chính (🌹 Điểm Save)", x:340, y:290, w:220, h:150, save:true },
        { id:"f1_living", name:"Phòng Khách Chính", sub:"Tầng 1 • Trục Chính", x:340, y:120, w:220, h:155 },
        { id:"f1_lib_w", name:"Thư Viện Tây", sub:"Tầng 1 • Đối xứng Trái", x:205, y:160, w:125, h:180 },
        { id:"f1_lib_e", name:"Thư Viện Đông", sub:"Tầng 1 • Đối xứng Phải", x:570, y:160, w:125, h:180 },
        { id:"f1_dining", name:"Phòng Ăn Lớn", sub:"Tầng 1 • Cánh Trái", x:55, y:190, w:140, h:160 },
        { id:"f1_kitchen", name:"Nhà Bếp (Lối Xuống B1)", sub:"Tầng 1 • Cánh Trái", x:55, y:60, w:140, h:120 },
        { id:"f1_stairs_l", name:"Cầu Thang Cánh Trái", sub:"Tầng 1 • Giao thông Cánh Trái", x:55, y:360, w:140, h:80 },
        { id:"f1_ballroom", name:"Sảnh Khiêu Vũ & Sân Khấu", sub:"Tầng 1 • Cánh Phải", x:705, y:180, w:155, h:170 },
        { id:"f1_pool", name:"Hồ Bơi & Phòng Thay Đồ", sub:"Tầng 1 • Sau Sảnh Khiêu Vũ", x:705, y:55, w:155, h:115 },
        { id:"f1_stairs_r", name:"Cầu Thang Cánh Phải", sub:"Tầng 1 • Giao thông Cánh Phải", x:705, y:360, w:155, h:80 },
        { id:"f1_secret", name:"Mật Thất Sau Kệ Sách", sub:"Tầng 1 • Mật Đạo Đã Mở Khóa", x:570, y:60, w:125, h:85, secret:true }
      ]
    },
    F2: {
      title: "BIỆT THỰ RỪNG THẲM • TẦNG 2 (KHU CĂN HỘ KHÁCH & HÀNH LANG DÀI)",
      rooms: [
        { id:"f2_stairs_l", name:"Cầu Thang Trái (T2)", sub:"Tầng 2 • Đầu Trái", x:40, y:220, w:95, h:110 },
        { id:"f2_butler", name:"Phòng Quản Gia Henry", sub:"Tầng 2 • Cạnh Cầu Thang Trái", x:40, y:85, w:120, h:120 },
        { id:"f2_hallway", name:"Hành Lang Dài Tầng 2", sub:"Tầng 2 • Trục Trung Tâm", x:145, y:235, w:585, h:80 },
        { id:"f2_r1_2", name:"Căn Hộ Khách #1 & #2", sub:"Tầng 2 • Dãy Bắc (Đầu Trái)", x:175, y:95, w:130, h:125 },
        { id:"f2_r3_5", name:"Căn Hộ Khách #3, #4, #5", sub:"Tầng 2 • Dãy Bắc (Giữa & Phải)", x:320, y:95, w:220, h:125 },
        { id:"f2_r6_8", name:"Căn Hộ Khách #6, #7, #8", sub:"Tầng 2 • Dãy Nam (Trái & Giữa)", x:175, y:330, w:220, h:125 },
        { id:"f2_r9_10", name:"Căn Hộ Khách #9 & #10", sub:"Tầng 2 • Dãy Nam (Đầu Phải)", x:410, y:330, w:140, h:125 },
        { id:"f2_lounge", name:"Sảnh Sinh Hoạt Chung", sub:"Tầng 2 • Đầu Phải (🌹 Điểm Save)", x:565, y:95, w:165, h:125, save:true },
        { id:"f2_stairs_r", name:"Cầu Thang Phải (T2)", sub:"Tầng 2 • Đầu Phải", x:740, y:220, w:110, h:110 },
        { id:"f2_secret", name:"Khoang Rỗng Phòng #1", sub:"Tầng 2 • Mật Đạo Đã Mở Khóa", x:175, y:42, w:130, h:45, secret:true }
      ]
    },
    F3: {
      title: "BIỆT THỰ RỪNG THẲM • TẦNG 3 (KHU GIA CHỦ - HẠN CHẾ XÂM NHẬP)",
      rooms: [
        { id:"f3_master", name:"2 Phòng Ngủ Master", sub:"Tầng 3 • Nhánh Trái (Cấm địa)", x:70, y:90, w:260, h:140, restricted:true },
        { id:"f3_kids", name:"Phòng Ngủ Trẻ Em", sub:"Tầng 3 • Nhánh Trái (Cấm địa)", x:70, y:250, w:155, h:145, restricted:true },
        { id:"f3_vip", name:"Phòng Khách VIP", sub:"Tầng 3 • Nhánh Trái", x:240, y:250, w:150, h:145, restricted:true },
        { id:"f3_office", name:"Phòng Làm Việc Arthur", sub:"Tầng 3 • Nhánh Phải (Cấm địa)", x:490, y:90, w:180, h:140, restricted:true },
        { id:"f3_reading", name:"Phòng Đọc Sách", sub:"Tầng 3 • Nhánh Phải (🌹 Điểm Save)", x:685, y:90, w:155, h:140, save:true },
        { id:"f3_priv_lib", name:"Thư Viện Khép Kín", sub:"Tầng 3 • Nhánh Phải", x:490, y:250, w:180, h:145, restricted:true },
        { id:"f3_gym", name:"Phòng Gym & Spa", sub:"Tầng 3 • Nhánh Phải", x:685, y:250, w:155, h:145 },
        { id:"f3_secret", name:"Lối Ngầm Phòng Trẻ Em", sub:"Tầng 3 • Mật Đạo Đã Mở Khóa", x:70, y:405, w:155, h:50, secret:true }
      ]
    },
    F4: {
      title: "BIỆT THỰ RỪNG THẲM • TẦNG 4 (KHU GIẢI TRÍ, THÁP CHUÔNG & TÂM LINH)",
      rooms: [
        { id:"f4_bell", name:"Tháp Chuông", sub:"Tầng 4 • Khu Trái", x:60, y:85, w:185, h:150 },
        { id:"f4_cinema", name:"Phòng Chiếu Phim", sub:"Tầng 4 • Khu Trái", x:60, y:255, w:185, h:155 },
        { id:"f4_wait", name:"Sảnh Chờ Trung Tâm", sub:"Tầng 4 • Khu Giữa (🌹 Điểm Save)", x:365, y:200, w:160, h:110, save:true },
        { id:"f4_bar", name:"Quán Bar Tầng 4", sub:"Tầng 4 • Bao quanh Sảnh Chờ", x:280, y:80, w:330, h:105 },
        { id:"f4_games", name:"2 Phòng Game & Karaoke", sub:"Tầng 4 • Bao quanh Sảnh Chờ", x:280, y:325, w:330, h:110 },
        { id:"f4_garden", name:"Vườn Thượng Uyển", sub:"Tầng 4 • Khu Phải", x:640, y:85, w:200, h:155 },
        { id:"f4_zen", name:"Thiền Viện Bí Mật", sub:"Tầng 4 • Cuối Đường Hẹp Khu Phải", x:660, y:275, w:180, h:145, restricted:true }
      ]
    }
  };

  window.initCrookedMap = function (state) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    document.body.innerHTML = `
      <div class="topbar">
        <div class="brand">CROOKED MAP</div>
        <div class="atmo-quote">${state.atmosphere || "Bão tuyết gầm rú ngoài khung kính; bóng tối nuốt chửng tòa lâu đài."}</div>
        <div class="clock-box">
          <div><b>${state.time || "18:00"}</b> | 🌡️ ${state.temp || "15°C"}</div>
          <div>Ngày ${state.day || "1/5"} • Biệt Thự Rừng Thẳm</div>
        </div>
      </div>
      <div class="main-wrap">
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
          <button class="go-btn" id="goBtn">TỚI ĐÓ</button>
          <div class="map-hint">Bấm vào phòng để trinh sát • Kéo để di chuyển bản đồ</div>
          <svg id="mapSvg" viewBox="0 0 900 560"><g id="mapStage"></g></svg>
        </div>
        <div class="inspector">
          <div class="ins-crumb">📍 <span id="insFloor"></span></div>
          <div class="ins-title" id="insName"></div>
          <div class="ins-sub" id="insSub"></div>
          <div class="divider"></div>
          <div class="sec-label">👂 NGHE HÓNG</div>
          <p class="sec-text" id="insHear"></p>
          <div class="sec-label">👁️ QUAN SÁT</div>
          <p class="sec-text" id="insSee"></p>
          <div class="sec-label">👥 AI ĐÓ</div>
          <div class="badge-wrap" id="insWho"></div>
          <div class="sec-label">🔎 GHI CHÚ TRINH SÁT</div>
          <p class="sec-text" id="insClue"></p>
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
        hear: ov.hear || "Chỉ có tiếng gió bão rít qua khe tường gỗ sồi và sự tĩnh lặng lạnh lẽo.",
        see: ov.see || "Không gian chìm dưới ánh đèn vàng vọt. Chưa ghi nhận xáo trộn bề mặt.",
        who: ov.who || [],
        clue: ov.clue || (r.save ? "🌹 Điểm Lưu Trữ cố định. Gõ /save tại đây." : "Dùng lệnh /khampha khi có mặt tại phòng để lục soát sâu.")
      };
    }

    function render(fKey) {
      curFloor = fKey;
      const fLayout = BASE_LAYOUT[fKey];
      document.getElementById("floorCrumb").textContent = fLayout.title;
      document.querySelectorAll(".floor-btn").forEach(b => b.classList.toggle("active", b.dataset.f === fKey));
      stage.innerHTML = `<rect x="35" y="40" width="840" height="430" fill="#e5d5b8" stroke="#9c8267" stroke-width="4"/>`;

      fLayout.rooms.forEach(raw => {
        if (raw.secret && !(state.unlockedSecrets || []).includes(raw.id)) return;
        const r = getRoomInfo(raw);
        const g = document.createElementNS("[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)", "g");
        g.setAttribute("class", `room-group ${r.restricted ? "restricted" : ""} ${r.secret ? "secret" : ""} ${r.id === curRoomId ? "selected" : ""}`);
        g.onclick = () => { curRoomId = r.id; render(fKey); inspect(r); };

        const badge = r.who.length ? `<rect class="pin-tag" x="${r.x + 12}" y="${r.y + r.h/2 + 6}" width="${r.w - 24}" height="18" fill="${r.who.join().includes('Charles') ? '#2b5876' : '#8b2626'}"/>
          <text class="pin-text" x="${r.x + r.w/2}" y="${r.y + r.h/2 + 18.5}">👣 ${r.who[0]}${r.who.length > 1 ? ' (+' + (r.who.length - 1) + ')' : ''}</text>` : "";

        g.innerHTML = `
          <rect class="room-rect" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}"/>
          <rect class="furn" x="${r.x+12}" y="${r.y+10}" width="${Math.min(38, r.w-24)}" height="9"/>
          <text class="room-label" x="${r.x + r.w/2}" y="${r.y + r.h/2 - (r.who.length ? 6 : -4)}">${r.save ? "🌹 " : (r.restricted ? "🔒 " : "")}${r.name}</text>
          ${badge}
        `;
        stage.appendChild(g);
      });
    }

    function inspect(r) {
      document.getElementById("insFloor").textContent = r.sub;
      document.getElementById("insName").textContent = r.name;
      document.getElementById("insSub").textContent = r.save ? "🌹 Điểm Lưu Trữ An Toàn" : (r.restricted ? "⚠️ Khu Vực Hạn Chế" : "Khu Vực Trong Biệt Thự");
      document.getElementById("insHear").textContent = r.hear;
      document.getElementById("insSee").textContent = r.see;
      document.getElementById("insClue").textContent = r.clue;
      const w = document.getElementById("insWho");
      w.innerHTML = r.who.length ? r.who.map(p => `<span class="npc-badge ${p.includes('Charles') ? 'ally' : ''}">${p}</span>`).join("") : `<span style="font-size:13px;color:#7a6652;font-style:italic;">Không có ai trong tầm nhìn</span>`;
    }

    document.querySelectorAll(".floor-btn").forEach(b => b.onclick = () => {
      const f = b.dataset.f;
      const first = getRoomInfo(BASE_LAYOUT[f].rooms[0]);
      curRoomId = first.id; render(f); inspect(first);
    });

    const sync = () => stage.setAttribute("transform", `translate(${panX},${panY}) scale(${scale})`);
    document.getElementById("zIn").onclick = () => { scale = Math.min(1.8, scale + 0.15); sync(); };
    document.getElementById("zOut").onclick = () => { scale = Math.max(0.65, scale - 0.15); sync(); };
    document.getElementById("zReset").onclick = () => { scale = 1; panX = 0; panY = 0; sync(); };

    const vp = document.getElementById("viewport");
    vp.onmousedown = e => { dragging = true; sx = e.clientX - panX; sy = e.clientY - panY; };
    window.onmousemove = e => { if (dragging) { panX = e.clientX - sx; panY = e.clientY - sy; sync(); } };
    window.onmouseup = () => dragging = false;

    document.getElementById("goBtn").onclick = () => {
      const r = BASE_LAYOUT[curFloor].rooms.find(x => x.id === curRoomId) || BASE_LAYOUT[curFloor].rooms[0];
      const cmd = `Di chuyển tới [${r.name}] (${curFloor}) và quan sát xung quanh.`;
      navigator.clipboard?.writeText(cmd);
      const t = document.getElementById("cmdToast");
      t.style.display = "block"; t.textContent = `Đã chép lệnh: "${cmd}"`;
      setTimeout(() => t.style.display = "none", 3000);
    };

    const startRoom = getRoomInfo(BASE_LAYOUT[curFloor].rooms.find(x => x.id === curRoomId) || BASE_LAYOUT[curFloor].rooms[0]);
    render(curFloor); inspect(startRoom);
  };
})();
