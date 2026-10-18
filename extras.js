(function () {
    function baslat() {
        const body = document.body;
        const test = document.getElementById("test");

        if (!test) {
            console.error("Test bölümü bulunamadı.");
            return;
        }

        const intro = document.createElement("div");
        intro.className = "ti-intro";
        intro.innerHTML = `
            <div>
                <div class="ti-wolf">🐺</div>
                <p class="ti-red">ATALARIMIZIN İZİNDE</p>
                <h1>Atalarımızın İzinde</h1>
<blockquote class="ti-quote">“Türk çocuğu ecdadını tanıdıkça, daha büyük işler yapmak için kendinde kuvvet bulacaktır.”</blockquote>
<p class="ti-quote-author">Gazi Mustafa Kemal Atatürk</p>
                <p>Tarihimizi keşfet, kültürümüzü tanı ve bilgi yolculuğuna başla.</p>
                <button class="ti-button" id="tiEnter">Yolculuğa Başla →</button>
                <p class="ti-intro-foot">Atalarımızın tarihini ve kültürünü tanımak, mirasımızı gelecek nesillere aktarmak için hazırlanmıştır.</p>
                <p class="ti-intro-foot"><strong>Created by Hira Cinali</strong> · İlk yazılım projem</p>
            </div>`;
        body.prepend(intro);

        const overlay = document.createElement("div");
        overlay.className = "ti-transition";
        overlay.innerHTML = `
    <div class="ti-runner ti-pack" aria-hidden="true">
        <span class="ti-wolf-emoji">🐺</span>
        <span class="ti-wolf-emoji">🐺</span>
        <span class="ti-wolf-emoji">🐺</span>
        <span class="ti-wolf-emoji">🐺</span>
    </div>
    <p class="ti-red">☪ ✦ ★</p>
    <p id="tiMessage">Atalarımızın izinde...</p>`;
        body.appendChild(overlay);
        // Tek kurt siluetinden dort kurtlu bir suru olustur.
        const packLeaderWolf = overlay.querySelector(".ti-runner");
        const wolfModel = packLeaderWolf &&
            packLeaderWolf.querySelector("svg");

        if (packLeaderWolf && wolfModel &&
            !packLeaderWolf.classList.contains("ti-pack")) {
            packLeaderWolf.classList.add("ti-pack");

            for (let i = 0; i < 3; i++) {
                const follower = wolfModel.cloneNode(true);
                follower.classList.add("ti-pack-member");
                packLeaderWolf.appendChild(follower);
            }
        }


        const bilgiler = [
            ["Asya Hun Devleti",
             "Asya Hun Devleti, Türk tarihinin bilinen ilk teşkilatlı devleti olarak genellikle kabul edilir. Mete Han, onlu askerî teşkilatla ilişkilendirilen önemli bir hükümdardır."],
            ["Göktürkler",
             "Göktürk Kağanlığı, Türk adını devlet adı olarak kullanan ilk devlet olarak bilinir. İlk Göktürk Kağanlığı 6. yüzyılda ortaya çıkmıştır."],
            ["Orhun Yazıtları",
             "Orhun Yazıtları 8. yüzyıldan kalan önemli eski Türkçe kaynaklardır. Kül Tigin ve Bilge Kağan yazıtları, dönemin yönetimi ve toplumu hakkında bilgiler verir."],
            ["Selçuklular ve Malazgirt",
             "Büyük Selçuklu Devleti Türk-İslam tarihinde önemli bir yere sahiptir. Alp Arslan'ın 1071 Malazgirt Zaferi, Anadolu tarihinin önemli dönüm noktalarındandır."],
            ["Mustafa Kemal Atatürk",
             "Atatürk Selanik'te doğmuştur. 19 Mayıs 1919'da Samsun'a çıkışı, Millî Mücadele'nin önemli başlangıç noktalarından biridir."],
            ["TBMM ve İstiklal Marşı",
             "Türkiye Büyük Millet Meclisi 23 Nisan 1920'de açılmıştır. Mehmet Âkif Ersoy'un yazdığı İstiklal Marşı 12 Mart 1921'de kabul edilmiştir."],
            ["Sakarya ve Büyük Taarruz",
             "Sakarya Meydan Muharebesi 1921'de gerçekleşmiştir. Büyük Taarruz 26 Ağustos 1922'de başlamış, 30 Ağustos'ta Başkomutanlık Meydan Muharebesi kazanılmıştır."],
            ["Cumhuriyet ve kültürümüz",
             "Türkiye Cumhuriyeti 29 Ekim 1923'te ilan edilmiştir. Dilimiz, müziğimiz, el sanatlarımız ve geleneklerimiz Türk kültürel mirasının parçalarıdır."]
        ];

        const yolculuk = document.createElement("div");
        yolculuk.className = "ti-journey";
        yolculuk.id = "historyJourney";
        yolculuk.innerHTML = `
            <div id="tiCounter">BİLGİ 1 / 8</div>
            <div class="ti-progress"><div id="tiProgress"></div></div>
            <h3 id="tiTitle"></h3>
            <p id="tiText"></p>
            <button class="ti-button" id="tiNext">Sonraki Bilgi →</button>
            <p id="tiStatus">Bilgiyi okuduktan sonra ilerle.</p>`;

        test.parentNode.insertBefore(yolculuk, test);

        let sira = 0;
        let tamamlandi = false;
        let gecis = false;

        const sayac = document.getElementById("tiCounter");
        const baslik = document.getElementById("tiTitle");
        const yazi = document.getElementById("tiText");
        const ilerleme = document.getElementById("tiProgress");
        const sonraki = document.getElementById("tiNext");
        const durum = document.getElementById("tiStatus");

        function bilgiGoster() {
            sayac.textContent = "BİLGİ " + (sira + 1) + " / 8";
            baslik.textContent = bilgiler[sira][0];
            yazi.textContent = bilgiler[sira][1];
            ilerleme.style.width = ((sira + 1) / 8 * 100) + "%";
            sonraki.textContent = sira === 7
                ? "Bilgileri Tamamla ve Teste Geç →"
                : "Sonraki Bilgi →";
        }

        function kurtlaGec(target, mesaj) {
            const hedef = document.getElementById(target);
            if (!hedef || gecis) return;

            gecis = true;
            document.getElementById("tiMessage").textContent = mesaj;
            overlay.classList.add("active");

            const kurt = overlay.querySelector(".ti-runner");
            kurt.classList.remove("ti-running");
            void kurt.offsetWidth;
            kurt.classList.add("ti-running");

            setTimeout(() => {
                hedef.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 400);

            setTimeout(() => {
                overlay.classList.remove("active");
                kurt.classList.remove("ti-running");
                gecis = false;
            }, 1250);
        }

        document.getElementById("tiEnter").addEventListener("click", function () {
            intro.remove();
            body.classList.remove("ti-locked");
            kurtlaGec("ana", "Atalarımızın İzinde yolculuğu başlıyor...");
        });

        sonraki.addEventListener("click", function () {
            if (tamamlandi) return;

            if (sira < 7) {
                sira++;
                bilgiGoster();
                return;
            }

            tamamlandi = true;
            sayac.textContent = "YOLCULUK TAMAMLANDI";
            baslik.textContent = "Tarih yolculuğunu tamamladın! 🇹🇷";
            yazi.textContent = "Sekiz bilgi ekranını tamamladın. Şimdi 10 soruluk testine geçebilirsin.";
            ilerleme.style.width = "100%";
            sonraki.textContent = "Tamamlandı ✓";
            sonraki.disabled = true;
            durum.textContent = "Testin kilidi açıldı.";
            kurtlaGec("test", "Şimdi bilgini sınama zamanı!");
        });

        document.addEventListener("click", function (event) {
            const el = event.target instanceof Element ? event.target : null;
            if (!el) return;

            const link = el.closest('a[href^="#"]');
            if (link) {
                const hedef = link.getAttribute("href").slice(1);
                if (!document.getElementById(hedef)) return;

                event.preventDefault();

                if (hedef === "test" && !tamamlandi) {
                    durum.textContent = "Önce sekiz bilgi ekranını tamamlamalısın.";
                    kurtlaGec("historyJourney", "Önce tarih yolculuğunu tamamla!");
                    return;
                }

                const mesajlar = {
                    ana: "Atalarımızın İzinde...",
                    tarih: "Tarihimizin izinde...",
                    test: "Bilgini sınama zamanı...",
                    puanlar: "Puan tablosuna yolculuk..."
                };
                kurtlaGec(hedef, mesajlar[hedef] || "Yolculuk devam ediyor...");
                return;
            }

            if (!tamamlandi) {
                const dugme = el.closest("#quiz button");
                if (dugme && /başla/i.test(dugme.textContent)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    durum.textContent = "Teste başlamadan önce sekiz bilgi ekranını tamamla.";
                    kurtlaGec("historyJourney", "Önce bilgileri keşfet!");
                }
            }
        }, true);

        body.classList.add("ti-locked");
        bilgiGoster();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", baslat);
    } else {
        baslat();
    }
})();


/* SITE_RATING_WIDGET_LOCAL */
(function () {
    const config = {
        apiKey: "AIzaSyCI4yFdFfB82JK2-22Fhxu_-2P0zt37CY",
        authDomain: "turkun-izinde-puan-20261018.firebaseapp.com",
        projectId: "turkun-izinde-puan-20261018",
        appId: "1:769511864708:web:03e9586ca04fe6b09785d1"
    };

    const ready = (async () => {
        const v = "11.10.0";
        const [a, au, fs] = await Promise.all([
            import(`https://www.gstatic.com/firebasejs/${v}/firebase-app.js`),
            import(`https://www.gstatic.com/firebasejs/${v}/firebase-auth.js`),
            import(`https://www.gstatic.com/firebasejs/${v}/firebase-firestore.js`)
        ]);
        const app = a.getApps().find(x => x.name === "ati-shared-final")
            || a.initializeApp(config, "ati-shared-final");
        return { auth: au.getAuth(app), au, db: fs.getFirestore(app), fs };
    })();

    async function refreshStats() {
        const avg = document.getElementById("siteRatingAverage");
        const countEl = document.getElementById("siteRatingCount");
        if (!avg || !countEl) return;

        try {
            const { db, fs } = await ready;
            const snap = await fs.getDocs(fs.collection(db, "siteRatings"));
            let total = 0;
            let count = 0;

            snap.forEach(d => {
                const score = d.data().score;
                if (Number.isInteger(score) && score >= 1 && score <= 10) {
                    total += score;
                    count++;
                }
            });

            avg.textContent = count ? (total / count).toFixed(1) + " / 10" : "Henüz oy yok";
            countEl.textContent = count + (count === 1 ? " değerlendirme" : " değerlendirme");
        } catch (e) {
            console.error("Site puanları yüklenemedi:", e);
            avg.textContent = "Firebase hatası";
            countEl.textContent = String(e.code || e.message || "Bilinmeyen hata");
        }
    }

    function init() {
        if (document.getElementById("siteRatingSection")) return;

        const section = document.createElement("section");
        section.id = "siteRatingSection";
        section.className = "site-rating-section";
        section.innerHTML = `
          <p class="site-rating-kicker">⭐ FİKRİNİ BİZİMLE PAYLAŞ</p>
          <h2>Atalarımızın İzinde'yi nasıl buldun?</h2>
          <p>Sitemize 10 üzerinden bir puan ver!</p>
          <div class="site-rating-summary">
            <strong id="siteRatingAverage">Yükleniyor...</strong>
            <span id="siteRatingCount">Değerlendirmeler yükleniyor...</span>
          </div>
          <div class="site-rating-buttons">
            ${Array.from({length:10}, (_,i) =>
              `<button type="button" class="site-rating-button"
              data-score="${i+1}" aria-label="${i+1} puan">${i+1}</button>`
            ).join("")}
          </div>
          <p class="site-rating-result" id="siteRatingResult" aria-live="polite">
            Puanını seç ❤️
          </p>
          <p class="site-rating-note">
            Her tarayıcı için anonim bir oy kaydedilir. Oyunu daha sonra değiştirebilirsin.
          </p>`;

        const footer = document.querySelector("footer");
        if (footer && footer.parentNode) {
            footer.parentNode.insertBefore(section, footer);
        } else {
            document.body.appendChild(section);
        }

        const result = section.querySelector("#siteRatingResult");

        section.querySelectorAll(".site-rating-button").forEach(button => {
            button.addEventListener("click", async () => {
                const score = Number(button.dataset.score);
                result.textContent = "Puanın kaydediliyor...";

                try {
                    const { auth, au, db, fs } = await ready;
                    if (!auth.currentUser) await au.signInAnonymously(auth);

                    await fs.setDoc(
                        fs.doc(db, "siteRatings", auth.currentUser.uid),
                        { score, updatedAt: fs.serverTimestamp() }
                    );

                    section.querySelectorAll(".site-rating-button").forEach(b => {
                        const selected = Number(b.dataset.score) === score;
                        b.classList.toggle("selected", selected);
                        b.setAttribute("aria-pressed", String(selected));
                    });

                    result.textContent = "Oyun kaydedildi, teşekkürler! ❤️";
                    await refreshStats();
                } catch (e) {
                    console.error("Site puanı kaydedilemedi:", e);
                    result.textContent = "Oy kaydedilemedi. Bağlantıyı kontrol et.";
                }
            });
        });

        refreshStats();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

/* FIREBASE_SHARED_SCOREBOARD_V1 */
(function () {
    const config = {
        apiKey: "AIzaSyCI4yFdFfB82JK2-22Fhxu_-2P0zt37CY",
        authDomain: "turkun-izinde-puan-20261018.firebaseapp.com",
        projectId: "turkun-izinde-puan-20261018",
        storageBucket: "turkun-izinde-puan-20261018.firebasestorage.app",
        messagingSenderId: "769511864708",
        appId: "1:769511864708:web:03e9586ca04fe6b09785d1"
    };

    let pendingSave = Promise.resolve();
    let lastSaveError = null;

    const ready = (async function () {
        const version = "11.10.0";
        const [appSDK, authSDK, dbSDK] = await Promise.all([
            import(`https://www.gstatic.com/firebasejs/${version}/firebase-app.js`),
            import(`https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`),
            import(`https://www.gstatic.com/firebasejs/${version}/firebase-firestore.js`)
        ]);

        const app = appSDK.getApps().find(x => x.name === "ati-shared-final")
            || appSDK.initializeApp(config, "ati-shared-final");
        const auth = authSDK.getAuth(app);
        await authSDK.signInAnonymously(auth);

        return {
            db: dbSDK.getFirestore(app),
            fs: dbSDK
        };
    })();

    window.kaydetPuan = function () {
        let score = NaN;
        let firstName = "";
        let lastName = "";

        try {
            score = Number(puan);
            firstName = String(oyuncuAdi || "").trim();
            lastName = String(oyuncuSoyadi || "").trim();
        } catch (e) {
            console.error("Test sonucu okunamadı.", e);
        }

        if (!Number.isInteger(score) || score < 0 || score > 10) {
            console.error("Geçersiz test puanı.");
            return Promise.resolve();
        }

        const first = Array.from(firstName)[0] || "";
        const last = Array.from(lastName)[0] || "";
        const initials = first && last
            ? first.toLocaleUpperCase("tr-TR") + ". " +
              last.toLocaleUpperCase("tr-TR") + "."
            : "Misafir";

        lastSaveError = null;

        pendingSave = ready.then(async function (services) {
            await services.fs.addDoc(
                services.fs.collection(services.db, "scores"),
                {
                    ad: initials,
                    puan: score,
                    createdAt: services.fs.serverTimestamp()
                }
            );
        }).catch(function (error) {
            lastSaveError = error;
            console.error("Puan ortak tabloya kaydedilemedi:", error);
        });

        return pendingSave;
    };

    window.tabloyuGoster = async function () {
        const table = document.getElementById("leaderboard");
        if (!table) return;

        table.textContent = "Ortak puan tablosu yükleniyor...";

        try {
            const services = await ready;
            await pendingSave;

            const q = services.fs.query(
                services.fs.collection(services.db, "scores"),
                services.fs.orderBy("puan", "desc"),
                services.fs.limit(50)
            );

            const results = await services.fs.getDocs(q);
            table.replaceChildren();

            if (lastSaveError) {
                const warning = document.createElement("p");
                warning.textContent =
                    "Son puan kaydedilemedi. İnternet bağlantısını kontrol et.";
                table.appendChild(warning);
            }

            if (results.empty) {
                const empty = document.createElement("p");
                empty.textContent = "Henüz ortak test sonucu yok.";
                table.appendChild(empty);
                return;
            }

            results.forEach(function (record, index) {
                const result = record.data();
                const row = document.createElement("div");
                row.className = "board-row";

                const name = document.createElement("span");
                const gizliAd = String(result.ad || "Misafir");
                name.textContent = (index + 1) + ". " +
                    (gizliAd.endsWith("***") ? gizliAd : gizliAd + " ***");

                const score = document.createElement("strong");
                score.className = "red";
                score.textContent = Number(result.puan) + " / 10";

                row.append(name, score);
                table.appendChild(row);
            });
        } catch (error) {
            console.error("Ortak puan tablosu yüklenemedi:", error);
            table.textContent =
                "Ortak puan tablosu yüklenemedi. Bağlantı ve Firebase ayarlarını kontrol et.";
        }
    };

    ready.then(function () {
        window.tabloyuGoster();
    }).catch(function (error) {
        console.error("Firebase bağlantısı kurulamadı:", error);
        const table = document.getElementById("leaderboard");
        if (table) {
            table.textContent =
                "Firebase bağlantı hatası: " + String(error.code || error.message || error);
        }
    });
})();

/* ATALARIMIZIN IZINDE EK SORULAR - PARCA 1 */
(function () {
    if (window.atiSorularBolum1) return;
    window.atiSorularBolum1 = true;
    window.atiEkSorular = window.atiEkSorular || [];
    window.atiEkSorular.push(
      {soru:"TÜRK-İSLAM TARİHİ — İlk Müslüman Türk devletlerinden biri hangisidir?",secenekler:["Karahanlılar","Göktürkler","Asya Hunları","Hazarlar"],dogru:0,bilgi:"Karahanlılar, Türk-İslam tarihinin önemli devletlerindendir."},
      {soru:"SELÇUKLULAR — Dandanakan Savaşı hangi yılda yapılmıştır?",secenekler:["1040","1071","1176","1243"],dogru:0,bilgi:"Dandanakan Savaşı 1040 yılında gerçekleşmiştir."},
      {soru:"MİMARİ — Divriği Ulu Camii hangi ilimizdedir?",secenekler:["Sivas","Konya","Bursa","Edirne"],dogru:0,bilgi:"Divriği Ulu Camii ve Darüşşifası Sivas'tadır."},
      {soru:"SELÇUKLULAR — Kösedağ Savaşı hangi yılda gerçekleşmiştir?",secenekler:["1071","1176","1243","1453"],dogru:2,bilgi:"Kösedağ Savaşı 1243 yılında gerçekleşmiştir."},
      {soru:"OSMANLI — İstanbul'un fethinden önce Osmanlı'nın başkentlerinden biri hangisidir?",secenekler:["Edirne","İzmir","Antalya","Trabzon"],dogru:0,bilgi:"Edirne, İstanbul'un fethinden önce Osmanlı başkentiydi."},
      {soru:"OSMANLI BASINI — İlk resmî Osmanlı gazetesi hangisidir?",secenekler:["Takvim-i Vekayi","İkdam","Tercüman-ı Ahval","Ceride-i Havadis"],dogru:0,bilgi:"Takvim-i Vekayi 1831'de yayımlanmaya başlamıştır."},
      {soru:"MİLLÎ MÜCADELE — Mudanya Ateşkes Antlaşması hangi yılda imzalanmıştır?",secenekler:["1919","1920","1922","1923"],dogru:2,bilgi:"Mudanya Ateşkes Antlaşması 1922'de imzalanmıştır."},
      {soru:"ATATÜRK — Atatürk soyadı hangi yılda verilmiştir?",secenekler:["1923","1928","1934","1938"],dogru:2,bilgi:"Atatürk soyadı 1934 yılında verilmiştir."},
      {soru:"ÇANAKKALE — Çanakkale Deniz Zaferi hangi tarihte anılır?",secenekler:["18 Mart","23 Nisan","19 Mayıs","30 Ağustos"],dogru:0,bilgi:"Çanakkale Deniz Zaferi 18 Mart'ta anılır."},
      {soru:"GELENEKSEL SPOR — Kırkpınar hangi spor dalıyla tanınır?",secenekler:["Yağlı güreş","Cirit","Okçuluk","At yarışları"],dogru:0,bilgi:"Kırkpınar, geleneksel yağlı güreşlerle tanınır."}
    );
})();

/* ATALARIMIZIN IZINDE EK SORULAR - PARCA 2 */
(function () {
    if (window.atiSorularBolum2) return;
    window.atiSorularBolum2 = true;
    window.atiEkSorular = window.atiEkSorular || [];
    window.atiEkSorular.push(
      {soru:"TÜRK TARİHİ — Eski Türklerde devlet işlerinin görüşüldüğü kurultay neydi?",secenekler:["Toy","Divan-ı Hümayun","Meclis-i Mebusan","Senato"],dogru:0,bilgi:"Eski Türklerde kurultay veya toy, önemli devlet işlerinin görüşüldüğü toplantıydı."},
      {soru:"UYGURLAR — Uygurların kültür tarihinde öne çıkan özelliklerinden biri nedir?",secenekler:["Yerleşik yaşam ve şehir kültürünün gelişmesi","Atlantik ticareti","Sanayi devrimi","Matbaanın Avrupa'da icadı"],dogru:0,bilgi:"Uygurlar döneminde yerleşik yaşam, şehir kültürü ve yazılı eserler gelişmiştir."},
      {soru:"TÜRK DESTANLARI — Ergenekon Destanı hangi temayla ilişkilendirilir?",secenekler:["Yeniden doğuş ve güçlenme","Deniz ticareti","İstanbul'un fethi","Cumhuriyetin ilanı"],dogru:0,bilgi:"Ergenekon anlatısı, yeniden güçlenme ve özgürlüğe kavuşma temalarıyla ilişkilendirilir."},
      {soru:"OSMANLI TARİHİ — Osmanlı Devleti'nin ilk anayasasının adı nedir?",secenekler:["Kanun-ı Esasi","Teşkilat-ı Esasiye","Mecelle","Sened-i İttifak"],dogru:0,bilgi:"Kanun-ı Esasi, 1876'da ilan edilen Osmanlı anayasasıdır."},
      {soru:"TÜRKİYE COĞRAFYASI — Türkiye'nin en yüksek dağı hangisidir?",secenekler:["Ağrı Dağı","Erciyes Dağı","Uludağ","Kaçkar Dağı"],dogru:0,bilgi:"Ağrı Dağı, Türkiye'nin en yüksek dağıdır."},
      {soru:"KÜLTÜREL MİRAS — UNESCO Dünya Mirası Listesi'nde yer alan Göbeklitepe hangi ilimizdedir?",secenekler:["Şanlıurfa","Mardin","Gaziantep","Diyarbakır"],dogru:0,bilgi:"Göbeklitepe, Şanlıurfa yakınlarında bulunan önemli bir arkeolojik alandır."},
      {soru:"TÜRK EDEBİYATI — İstiklal Marşı hangi şair tarafından yazılmıştır?",secenekler:["Mehmet Akif Ersoy","Yahya Kemal Beyatlı","Orhan Veli Kanık","Nazım Hikmet"],dogru:0,bilgi:"İstiklal Marşı'nın şairi Mehmet Akif Ersoy'dur."},
      {soru:"MİLLÎ MÜCADELE — Amasya Genelgesi hangi yılda yayımlanmıştır?",secenekler:["1919","1920","1921","1923"],dogru:0,bilgi:"Amasya Genelgesi 22 Haziran 1919'da yayımlanmıştır."},
      {soru:"CUMHURİYET TARİHİ — Halifelik hangi yılda kaldırılmıştır?",secenekler:["1922","1923","1924","1930"],dogru:2,bilgi:"Halifelik 3 Mart 1924'te kaldırılmıştır."},
      {soru:"TÜRK KÜLTÜRÜ — Geleneksel Türk kahvesi kültürü UNESCO tarafından hangi yıl somut olmayan kültürel miras olarak kabul edilmiştir?",secenekler:["2005","2013","2018","2023"],dogru:1,bilgi:"Türk kahvesi kültürü ve geleneği 2013'te UNESCO listesine alınmıştır."}
    );
})();
