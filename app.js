/* ---- js/config.js ---- */
/* Genel sabitler: kategoriler, puan ayarları, depolama anahtarı */
(function (App) {
  'use strict';

  App.KATEGORILER = {
    tr: ["Pop", "90'lar", "Arabesk", "Türkçe Rap", "Anadolu Rock", "Alternatif"],
    yabanci: ["Pop", "Rock", "Hip-Hop", "Elektronik", "Caz"]
  };

  App.PUAN_AYARLARI = {
    tamPuan: 1000,
    minPuan: 50,
    asamaCarpani: [1.0, 0.6, 0.3]
  };

  App.STORAGE_KEY = "ilk_nota_veri_v6";
  App.ESKI_STORAGE_KEY = "ilk_nota_veri_v5";

  /* Ayarlarda seçilebilen değerler (bozuk kayıtları ayıklamak için) */
  App.GECERLI_ADIM_SN = [2, 4, 7, 10];
  App.GECERLI_TUR_SAYISI = [3, 5, 10];

  /* Oyun modları: klasik (yazmalı) ve şıklı (4 seçenekli) */
  App.GECERLI_MODLAR = ["klasik", "sikli"];
  App.SIK_SAYISI = 4;
  // Avatarlar ikon adlarıdır (icons.js); eski emoji kayıtları ilk avatara döner
  App.AVATARLAR = ["kulaklik", "mikrofon", "nota", "plak", "simsek", "yildiz", "kalp", "alev", "ay", "gunes", "dalga", "tac"];
  App.SANATCI_LISTE_SAYISI = 7; // Doğru sanatçı yazılınca açılan şarkı listesinin üst sınırı

  /* İpucu: her ipucu tur puanından bu oranda kesinti yapar; tur başına en fazla 3 ipucu */
  App.IPUCU_AYARLARI = {
    kesintiOrani: 0.15,
    maksimum: 3
  };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/icons.js ---- */
/* Tek çizgili SVG ikon seti (emoji yerine). Kullanım: App.icon("play", 20) -> SVG metni */
(function (App) {
  'use strict';

  // Her ikon: yol verisi; "dolu" olanlar fill kullanır
  const YOLLAR = {
    play: { d: '<path d="M7.5 4.5v15l12-7.5z"/>', dolu: true },
    pause: { d: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>', dolu: true },
    replay: { d: '<path d="M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4"/>' },
    forward: { d: '<path d="M5 5l7 7-7 7M12 5l7 7-7 7"/>' },
    note: { d: '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.5"/><circle cx="17" cy="16" r="2.5"/>' },
    check: { d: '<path d="M5 12.5l4.5 4.5L19 7"/>', kalin: true },
    x: { d: '<path d="M6 6l12 12M18 6L6 18"/>', kalin: true },
    kalp: { d: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>' },
    kalpDolu: { d: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>', dolu: true },
    ipucu: { d: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>' },
    ses: { d: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16.5 9a4 4 0 0 1 0 6"/>' },
    sessiz: { d: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M17 9l4 6M21 9l-4 6"/>' },
    yardim: { d: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>' },
    geri: { d: '<path d="M15 5l-7 7 7 7"/>', kalin: true },
    cop: { d: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>' },
    takvim: { d: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>' },
    alev: { d: '<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>' },
    simsek: { d: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>' },
    kupa: { d: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8"/>' },
    rozet: { d: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5"/>' },
    kilit: { d: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>' },
    tac: { d: '<path d="M4 18l-1-10 5 4 4-7 4 7 5-4-1 10z"/>' },
    hedef: { d: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>' },
    kulaklik: { d: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>' },
    mikrofon: { d: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>' },
    plak: { d: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>' },
    yildiz: { d: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>' },
    ay: { d: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>' },
    gunes: { d: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>' },
    dalga: { d: '<path d="M4 12v0M8 8v8M12 4v16M16 8v8M20 11v2"/>' },
    uyari: { d: '<path d="M12 3L2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>' },
    asagiOk: { d: '<path d="M12 4v14M6 13l6 6 6-6"/>', kalin: true },
    bayrak: { d: '<path d="M6 21V4M6 4h11l-2 4 2 4H6"/>' }
  };

  function icon(ad, boyut) {
    const o = YOLLAR[ad] || YOLLAR.note;
    const b = boyut || 20;
    const sw = o.kalin ? 3 : 2.2;
    const fill = o.dolu ? "currentColor" : "none";
    return `<svg class="ico" width="${b}" height="${b}" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${o.d}</svg>`;
  }

  /* İkon + metin (düğme içeriği için) */
  function ikonlu(ad, metin, boyut) {
    return `${icon(ad, boyut)}<span>${metin}</span>`;
  }

  App.icon = icon;
  App.ikonlu = ikonlu;
  App.IKON_ADLARI = Object.keys(YOLLAR);
})(window.IlkNota = window.IlkNota || {});


/* ---- js/data/ozel-detaylar.js ---- */
/* Şarkılara özel hikaye ve ek bilgiler: kimlik -> [hikaye, ekBilgi] */
(function (App) {
  'use strict';

  App.OZEL_DETAYLAR = {
    "tr_alt_01": ["Kaan Tangöze'nin sade ama vurucu sözleriyle konserlerde binlerce kişinin hep bir ağızdan söylediği modern bir marş haline geldi.", "Şarkının girişindeki gitar rifi Türk alternatif rock tarihinin en bilinen açılışlarından biridir."],
    "tr_alt_02": ["Göksel'in akustik ve melankolik tınıları modern şehir yalnızlığıyla harmanladığı albümün en sevilen parçalarından biridir.", "Bende Bi' Aşk Var albümü, Göksel'in söz yazarı ve besteci kimliğini zirveye taşıyan çalışma olarak kabul edilir."],
    "tr_alt_03": ["Şebnem Ferah'ın solo kariyerinin ilk albümü 'Kadın'da yer alan ve 90'lardan günümüze uzanan zamansız bir sitem şarkısıdır.", "Albümün prodüktörlüğünü İskender Paydaş ve Tarkan Gözübüyük üstlenmiştir."],
    "tr_alt_04": ["Mustafa Hakkında Herşey filminin de müziği olan parça, kuşağının ruh halini en iyi özetleyen şarkılardan biri oldu.", "Dünya Yalan Söylüyor albümü Türkiye'de yüz binlerce kopya satarak alternatif rock'ı ana akıma taşıdı."],
    "tr_alt_05": ["Ayrılık sonrası yaşanan o buruk ve kabullenemeyen ruh halini Fatma Turgut'un güçlü vokaliyle anlatır.", "Sözleri Can Temiz'e, müziği ise Can Temiz ve Serkan Gürüzümcü'ye aittir."],
    "tr_alt_06": ["Sonbahar mevsiminin İstanbul'a kattığı puslu ve hüzünlü atmosferi Teoman'ın melankolik anlatımıyla birleştirir.", "Her eylül ayında sosyal medyada ve radyolarda dinlenme oranları katlanarak artar."],
    "tr_pop_01": ["Tarkan'ın Karma albümünün çıkış şarkısı olarak Türk pop müziğinde hem sound hem de görsel açıdan yeni bir dönem başlattı.", "Tekli olarak yayınlandığında Türkiye'de en hızlı satan fiziki single rekorunu kırmıştır."],
    "tr_pop_02": ["2003 Eurovision Şarkı Yarışması'nda Türkiye'ye tarihindeki ilk birinciliği getiren efsanevi pop-oryantal sentezidir.", "Şarkının söz ve müziğinde Demir Demirkan ile Sertab Erener'in ortak imzası vardır."],
    "tr_pop_03": ["Sözü Gülşen'e, düzenlemesi Ozan Çolakoğlu'na ait olan şarkı 2015 yazına damgasını vurdu.", "Video klibi Küba'nın başkenti Havana'da çekilmiştir."],
    "tr_pop_04": ["Yıldız Tilbe'nin klasikleşmiş eserinin Emrah Karaduman düzenlemesiyle yeniden yorumlandığı saygı albümü projesidir.", "Yayınlandığı ilk 24 saatte Türkiye'de dijital platformlarda izlenme rekoru kırmıştır."],
    "tr_pop_05": ["Adımı Kalbine Yaz albümünün en hareketli hitlerinden biri olarak yaz listelerinin zirvesinde yer aldı.", "Sözleri Sezen Aksu ve Tarkan'a, müziği Ozan Çolakoğlu ve Tarkan'a aittir."],
    "tr_pop_06": ["Hadise'nin Tavsiye albümünde yer alan ve enerjik nakaratıyla uzun süre listelerde kalan pop hitidir.", "Sözleri Gökhan Şahin'e, müziği ve düzenlemesi Emrah Karaduman'a aittir."],
    "tr_90_01": ["90'lar Türkçe Pop patlamasının fitilini ateşleyen ve dans koreografisiyle bir döneme damga vuran şarkıdır.", "Albüm 2 milyondan fazla kaset satışı elde ederek tarihi bir başarı yakalamıştır."],
    "tr_90_02": ["Mustafa Sandal'ın ilk albümünde yer alan ve eğlenceli tekerlemesiyle 90'ların en neşeli hitlerinden biri olan parçadır.", "Şarkının klibi o dönem için oldukça yenilikçi kurgusuyla dikkat çekmiştir."],
    "tr_90_03": ["Öpücük sesiyle özdeşleşen nakaratıyla Avrupa'dan Güney Amerika'ya kadar tüm dünyada listeleri altüst etti.", "Dünya genelinde 10'dan fazla dilde farklı sanatçılar tarafından yeniden uyarlanmıştır."],
    "tr_90_04": ["Serdar Ortaç'ı müzik dünyasına tanıtan ve 90'lar pop kültürünün simgesi haline gelen çıkış şarkısıdır.", "Klipteki zeytin sahnesi Türk pop müzik tarihinin en çok konuşulan anlarından biri olmuştur."],
    "tr_90_05": ["Yıldız Tilbe'nin ilk solo albümüne adını veren ve 90'ların en güçlü duygusal marşlarından biri olan başyapıtıdır.", "Yıldız Tilbe bu şarkıyı yayınlamadan önce Sezen Aksu'nun vokalistliğini yapmaktaydı."],
    "tr_90_06": ["Gölgede Aynı albümünün çıkış parçası olarak maddi değerlerle gerçek aşk arasındaki farkı akılda kalıcı bir melodiyle anlatır.", "Albüm kaset ve CD olarak 3 milyonun üzerinde satış rakamına ulaşmıştır."],
    "tr_arb_01": ["Sözleri Murathan Mungan'a, müziği Sunay Özgür'e ait olan şarkı, Müslüm Gürses'in farklı müzik kitleleriyle buluşmasında köprü oldu.", "Müslüm Baba'nın rock ve pop dinleyicileri tarafından da tutkuyla dinlenmesini sağlayan ilk çalışmalardandır."],
    "tr_arb_02": ["Orhan Gencebay'ın serbest çalışmalar dönemi olarak adlandırdığı arabesk müziğin en anıtsal eserlerinden biridir.", "Aynı isimli sinema filminde Orhan Gencebay ve Müjde Ar başrolleri paylaşmıştır."],
    "tr_arb_03": ["Sözleri Behlül Pektaş'a, müziği Rıfat Şanlıel'e ait olan ve Müslüm Gürses yorumuyla ölümsüzleşen isyan klasiğidir.", "Şarkı aynı adlı sinema filmiyle birlikte dönemin en büyük toplumsal fenomenlerinden biri olmuştur."],
    "tr_arb_04": ["Küskünüm albümünün en bilinen eserlerinden biri olup, arabesk müziğin en çok ezbere bilinen nakaratlarından birine sahiptir.", "Sözleri Hasan Bağlan'a, bestesi Burhan Bayar'a aittir."],
    "tr_arb_05": ["Ferdi Tayfur'un 90'lı yıllarda kaset satış rekorları kıran Prangalar albümünün çıkış şarkısıdır.", "Gülhane Parkı'nda verdiği tarihin en kalabalık konserlerinden birinde yüz binlerce kişi tarafından söylenmiştir."],
    "tr_arb_06": ["Sözleri Ali Tekintüre'ye, müziği Osman Bayşu'ya ait olan eser, yıllar sonra genç kuşaklar arasında da marş haline geldi.", "Tribünlerden televizyon dizilerine kadar pek çok alanda yeniden popülerleşmiştir."],
    "tr_rap_01": ["Ceza'nın hızlı rap (flex) tekniğini Türkiye'de geniş kitlelere tanıttığı ve efsaneleştiği parçadır.", "Med Cezir albümünün altyapıları Sagopa Kajmer tarafından hazırlanmıştır."],
    "tr_rap_02": ["Ceza'nın kendi müzik yolculuğunu ve Türkçe rap'in yükselişini anlattığı kült albümünün isim şarkısıdır.", "Klipte Türk rap kültürünün o dönemki pek çok önemli siması yer almıştır."],
    "tr_rap_03": ["Sokak kültürünü ve gündelik hayatın tekdüzeliğini anlatan şarkı, Türkçe rap'in ana akım yükselişinde kilit rol oynadı.", "Çukur dizisinde kullanılmasıyla birlikte yüz milyonlarca dinlenmeye ulaştı."],
    "tr_rap_04": ["Türkçe trap ve alternatif hip-hop sound'unu şekillendiren Müptezhel albümünün en popüler parçalarından biridir.", "Albümün prodüksiyonunda Bugy ve DJ Artz önemli rol oynamıştır."],
    "tr_rap_05": ["Ceza'nın uzun bir aradan sonra çıkardığı ve modern altyapılarla hızlı vokal tekniğini birleştirdiği hit parçasıdır.", "Şarkının video klibi uluslararası birçok festivalde ödül ve adaylık kazanmıştır."],
    "tr_rap_06": ["Gazapizm'in sert vokal tonu ve toplumsal eleştiri barındıran sözleriyle öne çıkan çalışmalarından biridir.", "Yayınlandığı dönemde dijital listelerde hızla ilk sıraya yerleşmiştir."],
    "tr_ar_01": ["Barış Manço ve Kurtalan Ekspres'in progresif rock ile Anadolu ezgilerini birleştirdiği başyapıttır.", "Bas gitar yürüyüşü Ahmet Güvenç'e, elektro gitar soloları Bahadır Akkuzu'ya aittir."],
    "tr_ar_02": ["Cem Karaca ve Apaşlar'ın kaydettiği, Anadolu Rock tarihinin ilk büyük hitlerinden biridir.", "Sözleri Mehmet Soyarslan tarafından yazılmıştır."],
    "tr_ar_03": ["Elektro bağlama ve rock enstrümanlarının kusursuz uyumuyla gündelik hayatın dertlerine tebessümle yaklaşır.", "Erkin Koray, Orhan Gencebay ile birlikte elektro bağlamayı geliştiren isimdir."],
    "tr_ar_04": ["Anadolu insanının cömertliğini, felsefesini ve halk deyişlerini modern rock formuyla anlatır.", "Kıbrıs'ta gerçekten yaşamış hayırsever bir toprak ağasının hikayesinden esinlenilmiştir."],
    "tr_ar_05": ["Barış Manço'nun babaannesi Nimet Manço'nun vefatı üzerine Kurtalan Ekspres basçısı Ahmet Güvenç ile birlikte yaptığı ağıt-şarkıdır.", "Türkiye'de nesiller boyu mezuniyetlerden anma törenlerine kadar en çok söylenen eserlerden biridir."],
    "tr_ar_06": ["Cem Karaca'nın güçlü vokaliyle hayat bulan şarkı, sonradan Barış Akarsu yorumuyla da genç nesillere ulaştı.", "Söz ve müziği Nerde Kalmıştık albümünde Cem Karaca ile birlikte çalışan Cahit Berkay ve Uğur Dikmen ekibinin dokunuşlarını taşır."],
    "yb_pop_01": ["80'lerin synth-wave tınılarını modern pop ile birleştirerek tüm zamanların en çok dinlenen şarkılarından biri oldu.", "Billboard Hot 100 listesinde 90 hafta kalarak rekor kırmıştır."],
    "yb_pop_02": ["Efsanevi bas yürüyüşüyle açılan şarkı, pop müziğin küresel ölçekte kurallarını yeniden yazdı.", "Michael Jackson ikonik Moonwalk dansını ilk kez bu şarkıyı seslendirirken yapmıştır."],
    "yb_pop_03": ["Marimba tabanlı tropikal house ritmiyle açılan şarkı, dijital çağın en çok dinlenen pop parçalarından biri oldu.", "Ed Sheeran bu şarkıyı başlangıçta Rihanna için yazmaya başlamıştı."],
    "yb_pop_04": ["Adele'in kalp kırıklığı sonrası stüdyoda Paul Epworth ile bir öğleden sonra kaydettiği soul-pop başyapıtıdır.", "Yılın Kaydı ve Yılın Şarkısı dahil 3 Grammy Ödülü kazanmıştır."],
    "yb_pop_05": ["Minimalist bas hattı ve fısıltılı vokaliyle modern pop müziğe karanlık ve eğlenceli bir soluk getirdi.", "Şarkıdaki yaya geçidi sinyal sesi Avustralya'nın Sidney sokaklarında kaydedilmiştir."],
    "yb_pop_06": ["Bruno Mars'ın vokalleriyle 80'ler Minneapolis funk tarzını günümüze taşıyan enerjik hit parçadır.", "Gitar bölümünün tamamlanması stüdyoda 80'den fazla kayıt denemesi sürmüştür."],
    "yb_rock_01": ["Grunge akımını tüm dünyaya yayarak 90'lar alternatif rock sahnesinin marşı haline geldi.", "Şarkının ismi Kurt Cobain'in bir arkadaşının duvara yazdığı deodorant markası şakasından gelmektedir."],
    "yb_rock_02": ["Nakaratı olmayan, opera, balad ve hard rock bölümlerinden oluşan 6 dakikalık benzersiz bir rock operasıdır.", "Freddie Mercury şarkının tüm vokal armonilerini ve piyano partisyonlarını zihninde kurgulayarak stüdyoya girmiştir."],
    "yb_rock_03": ["Mike Shinoda'nın rap dizeleri ile Chester Bennington'ın güçlü nakaratını birleştiren 2000'ler nu-metal klasiğidir.", "Unutulmaz piyano girişi Mike Shinoda tarafından gece boyu süren bir prova sırasında bulunmuştur."],
    "yb_rock_04": ["Ağır davul ritmi ve hipnotik gitar rifiyle 2010'lu yılların en tanınan indie rock şarkısı oldu.", "Ses dalgalarından oluşan animasyon video klibi 1.5 milyardan fazla izlenmiştir."],
    "yb_rock_05": ["Başkalarının beklentileri altında ezilme ve kendi kimliğini koruma mücadelesini anlatan Meteora albümünün kapanış şarkısıdır.", "Klibin kilise ve köprü sahneleri Çek Cumhuriyeti'nin başkenti Prag'da çekilmiştir."],
    "yb_rock_06": ["Amy Lee'nin operatik vokalleri ve sert gitar rifleriyle gotik rock'ı dünya listelerinin zirvesine taşıdı.", "En İyi Hard Rock Performansı dalında Grammy Ödülü kazanmıştır."],
    "yb_hh_01": ["8 Mile filmi için yazılan şarkı, bir rapçinin sahneye çıkmadan önceki tek şansını değerlendirme mücadelesini anlatır.", "En İyi Özgün Şarkı dalında Oscar kazanan ilk hip-hop şarkısıdır."],
    "yb_hh_02": ["Dr. Dre'nin prodüktörlüğünde kaydedilen parça, 2000'lerin en unutulmaz hip-hop ritimlerinden birine sahiptir.", "Ritim aslında önce D12 grubuna teklif edilmiş, ardından 50 Cent tarafından kaydedilmiştir."],
    "yb_hh_03": ["Eminem'in müzik endüstrisine geri dönüşünü mizahi ve enerjik bir dille anlattığı hit parçasıdır.", "Video klibi MTV Video Müzik Ödülleri'nde Yılın Videosu dahil 4 ödül kazanmıştır."],
    "yb_hh_04": ["Drake'in kariyerinin en büyük küresel hitlerinden biri olarak çıktığı hafta dinlenme rekorlarını altüst etti.", "Drake, klibin yaklaşık 1 milyon dolarlık bütçesinin tamamını Miami'deki ihtiyaç sahiplerine dağıtmıştır."],
    "yb_hh_05": ["Mike WiLL Made-It tarafından hazırlanan sert piyano ritmi üzerine Kendrick Lamar'ın keskin lirikleriyle yükselir.", "Yer aldığı DAMN. albümü, klasik ve caz dışında Pulitzer Müzik Ödülü kazanan ilk eser olmuştur."],
    "yb_hh_06": ["Daft Punk'ın 'Harder, Better, Faster, Stronger' parçasından alınan sample ile hip-hop'ta elektronik dönemi başlattı.", "Şarkının miksaj süreci için 8 farklı ses mühendisiyle 50'den fazla versiyon çalışılmıştır."],
    "yb_el_01": ["Pharrell Williams ve Nile Rodgers işbirliğiyle disko ve funk öğelerini elektronik müzikle buluşturdu.", "Yılın Kaydı dahil olmak üzere 2 Grammy Ödülü kazanmıştır."],
    "yb_el_02": ["Sia'nın güçlü vokalleriyle elektronik dans müziğinin (EDM) en duygusal ve patlayıcı hitlerinden biri oldu.", "Sia aslında yalnızca demo vokali kaydetmişti ancak Guetta bu kaydı o kadar beğendi ki değiştirmeden yayınladı."],
    "yb_el_03": ["Akustik gitar ve country-folk öğelerini elektronik dans müziğiyle birleştirerek EDM dünyasında devrim yarattı.", "Vokalleri ünlü soul sanatçısı Aloe Blacc tarafından seslendirilmiştir."],
    "yb_el_04": ["Big room house akımının en bilinen enstrümantal parçası olarak tüm festivallerin ana marşı haline geldi.", "Martin Garrix bu parçayı yayınladığında henüz 17 yaşındaydı."],
    "yb_el_05": ["DJ Snake ve Danimarkalı şarkıcı MØ ortaklığıyla dancehall ve elektronik müziği küresel listelerin zirvesine taşıdı.", "Video klibi Hindistan'ın Maharashtra eyaletindeki tarihi saraylarda çekilmiştir."],
    "yb_el_06": ["Calvin Harris'in hem prodüktörlüğünü üstlendiği hem de kendi vokalleriyle seslendirdiği en büyük yaz hitlerinden biridir.", "Klibinde ünlü aktör Jason Statham konuk oyuncu olarak yer almıştır."],
    "yb_caz_01": ["Paul Desmond tarafından bestelenen ve 5/4'lük aksak ritmiyle adını alan tarihin en çok satan caz enstrümantalidir.", "Tüm zamanların bir milyon satışı aşan ilk caz single'ı unvanına sahiptir."],
    "yb_caz_02": ["Count Basie ve orkestrasıyla kaydedilen versiyonu, caz standartları arasında en ikonik yorum kabul edilir.", "Apollo 10 ve Apollo 11 uzay görevlerinde astronotlar tarafından Ay'da dinlenmiştir."],
    "yb_caz_03": ["Özgürlüğü ve yeni bir başlangıcı simgeleyen sözleri, Nina Simone'un eşsiz vokali ve üflemeli aranjmanıyla ölümsüzleşti.", "Başlangıçta 1964 yapımı bir İngiliz müzikali için Anthony Newley ve Leslie Bricusse tarafından yazılmıştır."],
    "yb_caz_04": ["Gündelik hayatın sade güzelliklerini Louis Armstrong'un sıcak ve buğulu sesiyle anlatan zamansız bir eserdir.", "1999 yılında Grammy Onur Listesi'ne (Hall of Fame) dahil edilmiştir."],
    "yb_caz_05": ["Ray Charles ve The Raelettes grubunun karşılıklı atışmalarıyla ilerleyen ritim ve caz-blues klasiğidir.", "Percy Mayfield tarafından yazılmış ve En İyi R&B Kaydı dalında Grammy kazanmıştır."],
    "yb_caz_06": ["60'ların soul ve caz vokal geleneğini Mark Ronson'ın modern prodüksiyonuyla birleştiren ikonik parçadır.", "Albüm Amy Winehouse'a bir gecede 5 Grammy Ödülü kazandırmıştır."]
  };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/data/sarki-veritabani.js ---- */
/* Şarkı veritabanı: her kategori için 30 şarkı. Kayıt: [ad, sanatçı, yıl, albüm, alternatif adlar] */
(function (App) {
  'use strict';

  App.SARKI_VERITABANI = [
    // 1. TÜRKÇE - ALTERNATİF (30 Şarkı)
    { kod: "tr_alt", dil: "tr", tur: "Alternatif", liste: [
      ["Senden Daha Güzel", "Duman", 2009, "Duman II", ["Senden Daha Guzel"]],
      ["Acı Tatlı", "Göksel", 2012, "Bende Bi' Aşk Var", ["Aci Tatli"]],
      ["Bu Aşk Fazla Sana", "Şebnem Ferah", 1996, "Kadın", ["Bu Ask Fazla Sana"]],
      ["Bir Derdim Var", "Mor ve Ötesi", 2004, "Dünya Yalan Söylüyor", []],
      ["Değmesin Ellerimiz", "Model", 2011, "Diğer Masallar", ["Degmesin Ellerimiz"]],
      ["İstanbul'da Sonbahar", "Teoman", 2001, "Gönülçelen", ["Istanbulda Sonbahar", "Sonbahar"]],
      ["Sil Baştan", "Şebnem Ferah", 2001, "Perdeler", ["Sil Bastan"]],
      ["Cambaz", "Mor ve Ötesi", 2004, "Dünya Yalan Söylüyor", []],
      ["Bu Akşam", "Duman", 2002, "Belki Alışman Lazım", ["Bu Aksam"]],
      ["Belki Alışman Lazım", "Duman", 2002, "Belki Alışman Lazım", ["Belki Alisman Lazim"]],
      ["Pembe Mezarlık", "Model", 2011, "Diğer Masallar", ["Pembe Mezarlik"]],
      ["Yollarda Bulurum Seni", "Haluk Levent", 1993, "Yollarda", ["Yollarda"]],
      ["Elfida", "Haluk Levent", 2006, "Akşam Üstü", []],
      ["Aşk Kırıntıları", "Teoman", 2003, "Teoman", ["Ask Kirintilari"]],
      ["Paramparça", "Teoman", 2000, "O", ["Paramparca"]],
      ["Beni Sen İnandır", "Pinhani", 2006, "İnandığın Masallar", ["Beni Sen Inandir"]],
      ["Hele Bi Gel", "Pinhani", 2006, "İnandığın Masallar", ["Hele Bir Gel"]],
      ["Ne Güzel Güldün", "Pinhani", 2008, "Zaman Beklemez", ["Ne Guzel Guldun"]],
      ["Aşk-ı Virane", "Rafet El Roman", 2008, "Bir Roman Gibi", ["Aski Virane"]],
      ["Gidemem", "Sezen Aksu", 1988, "Sezen Aksu'88", []],
      ["Yalnızlık Senfonisi", "Sezen Aksu", 1996, "Düş Bahçeleri", ["Yalnizlik Senfonisi"]],
      ["Fırtınalar", "Ebru Gündeş", 1995, "Ben Daha Büyümedim", ["Firtinalar"]],
      ["Bal", "Duman", 2009, "Duman I", []],
      ["Kufi", "Duman", 2024, "Kufi", []],
      ["Antidepresan", "Mert Demir", 2022, "Antidepresan", []],
      ["Ateşe Düştüm", "Mert Demir", 2023, "Ateşe Düştüm", ["Atese Dustum"]],
      ["Dinle Beni Bi'", "Yüzyüzeyken Konuşuruz", 2018, "Akustik Travma", ["Dinle Beni Bi"]],
      ["Kazılı Kuyum", "Yüzyüzeyken Konuşuruz", 2020, "Kazılı Kuyum", ["Kazili Kuyum"]],
      ["Bi' Tek Ben Anlarım", "KÖFN", 2022, "Bi' Tek Ben Anlarım", ["Bi Tek Ben Anlarim"]],
      ["Ali Cabbar", "Emir Can İğrek", 2023, "Parti İptal", []]
    ]},
    // 2. TÜRKÇE - POP (30 Şarkı)
    { kod: "tr_pop", dil: "tr", tur: "Pop", liste: [
      ["Kuzu Kuzu", "Tarkan", 2001, "Karma", ["Kuzu"]],
      ["Everyway That I Can", "Sertab Erener", 2003, "No Boundaries", ["Every Way That I Can"]],
      ["Bangır Bangır", "Gülşen", 2015, "Bangır Bangır", ["Bangir Bangir"]],
      ["Yalnız Çiçek", "Aleyna Tilki", 2018, "Yıldız Tilbe'nin Yıldızlı Şarkıları", ["Yalniz Cicek"]],
      ["Öp", "Tarkan", 2010, "Adımı Kalbine Yaz", ["Op"]],
      ["Prenses", "Hadise", 2014, "Tavsiye", []],
      ["Dudu", "Tarkan", 2003, "Dudu", []],
      ["Yolla", "Tarkan", 2017, "10", []],
      ["Cevapsız Çınlama", "Emrah Karaduman", 2016, "Cevapsız Çınlama", ["Cevapsiz Cinlama"]],
      ["Sen Olsan Bari", "Aleyna Tilki", 2017, "Sen Olsan Bari", []],
      ["Miş Miş", "Simge", 2015, "Miş Miş", ["Mis Mis"]],
      ["Aşkın Olayım", "Simge", 2018, "Ben Bazen", ["Askin Olayim"]],
      ["Yankı", "Simge", 2016, "Yankı", ["Yanki"]],
      ["Bu Nasıl Aşk", "Mabel Matiz", 2018, "Maya", ["Bu Nasil Ask"]],
      ["Öyle Kolaysa", "Mabel Matiz", 2018, "Maya", ["Oyle Kolaysa"]],
      ["Gel", "Mabel Matiz", 2015, "Gök Nerede", []],
      ["Fırtınadayım", "Mabel Matiz", 2018, "Maya", ["Firtinadayim"]],
      ["Martılar", "Edis", 2021, "Martılar", ["Martilar"]],
      ["Çok Çok", "Edis", 2017, "An", ["Cok Cok"]],
      ["Dudak", "Edis", 2016, "An", []],
      ["Yatcaz Kalkcaz Ordayım", "Gülşen", 2013, "Beni Durdursan mı?", ["Yatcaz Kalkcaz"]],
      ["İltimas", "Gülşen", 2014, "İltimas", ["Iltimas"]],
      ["Olsun", "Sertab Erener", 2016, "Kırık Kalpler Albümü", []],
      ["Rengârenk", "Sertab Erener", 2010, "Rengârenk", ["Rengarenk"]],
      ["Düm Tek Tek", "Hadise", 2009, "Fast Life", ["Dum Tek Tek"]],
      ["Sıfır Tolerans", "Hadise", 2017, "Şampiyon", ["Sifir Tolerans"]],
      ["Dansöz", "Serdar Ortaç", 2006, "Mesafe", ["Dansoz"]],
      ["Poşet", "Serdar Ortaç", 2010, "Kara Kedi", ["Poset"]],
      ["Romeo", "Hande Yener", 2007, "Nasıl Delirdim?", []],
      ["Bodrum", "Hande Yener", 2010, "Hande'ye Neler Oluyor?", []]
    ]},
    // 3. TÜRKÇE - 90'LAR (30 Şarkı)
    { kod: "tr_90", dil: "tr", tur: "90'lar", liste: [
      ["Abone", "Yonca Evcimik", 1991, "Abone", []],
      ["Bandıra Bandıra", "Mustafa Sandal", 1994, "Suç Bende", ["Bandira Bandira"]],
      ["Şımarık", "Tarkan", 1997, "Ölürüm Sana", ["Simarik", "Kiss Kiss"]],
      ["Karabiberim", "Serdar Ortaç", 1994, "Aşk İçin", []],
      ["Delikanlım", "Yıldız Tilbe", 1994, "Delikanlım", ["Delikanlim"]],
      ["Araba", "Mustafa Sandal", 1996, "Gölgede Aynı", ["Onun Arabasi Var"]],
      ["Kıl Oldum", "Tarkan", 1992, "Yine Sensiz", ["Kil Oldum", "Kil Oldum Abi"]],
      ["Hepsi Senin Mi", "Tarkan", 1994, "Aacayipsin", ["Şıkıdım", "Sikidim"]],
      ["Ölürüm Sana", "Tarkan", 1997, "Ölürüm Sana", ["Olurum Sana"]],
      ["Hadi Bakalım", "Sezen Aksu", 1991, "Gülümse", ["Hadi Bakalim"]],
      ["Her Şeyi Yak", "Sezen Aksu", 1991, "Gülümse", ["Her Seyi Yak"]],
      ["Rakkas", "Sezen Aksu", 1995, "Işık Doğudan Yükselir", []],
      ["Sakin Ol", "Sertab Erener", 1992, "Sakin Ol!", []],
      ["Ateşle Barut", "Sertab Erener", 1992, "Sakin Ol!", ["Atesle Barut"]],
      ["Kandırdım", "Kenan Doğulu", 1996, "Hiç Bana Sordun mu?", ["Kandirdim"]],
      ["Yaparım Bilirsin", "Kenan Doğulu", 1993, "Yaparım Bilirsin", ["Yaparim Bilirsin"]],
      ["Benimle Oynama", "Burak Kut", 1994, "Benimle Oynama", []],
      ["Fırtınalar", "Ebru Gündeş", 1995, "Ben Daha Büyümedim", ["Firtinalar"]],
      ["Ah Canım Sevgilim", "Rüya Ersavcı", 1993, "İstemiyorum Baba", ["Ah Canim Sevgilim", "İstemiyorum Baba"]],
      ["Sallayalım Dünyayı", "Cartel", 1995, "Cartel", ["Cartel", "Sallayalim Dunyayi"]],
      ["Kızılötesi", "Mirkelam", 1995, "Mirkelam", ["Her Gece"]],
      ["Tavla", "Mirkelam", 1995, "Mirkelam", []],
      ["Aşkına Eşkıya", "Zafer Peker", 1994, "Sensiz Sabah Olmuyor", ["Diyemedim"]],
      ["Vurula Vurula", "Hakan Peker", 1991, "Hey Corç", ["Hey Corç"]],
      ["Ateşini Yolla Bana", "Hakan Peker", 1995, "Ateşini Yolla Bana", ["Atesini Yolla Bana"]],
      ["Hasret", "İzel Çelik Ercan", 1991, "Özledim", ["Özledim", "Ozledim"]],
      ["Ah Canım Vah Canım", "Ahmet", 1994, "Ah Canım Vah Canım", ["Ah Canim Vah Canim"]],
      ["Hovarda", "Emel Müftüoğlu", 1995, "Hovarda", []],
      ["Med Cezir", "Levent Yüksel", 1993, "Med Cezir", []],
      ["Zalim", "Levent Yüksel", 1995, "Levent Yüksel'in 2. CD'si", []]
    ]},
    // 4. TÜRKÇE - ARABESK (30 Şarkı)
    { kod: "tr_arb", dil: "tr", tur: "Arabesk", liste: [
      ["Nilüfer", "Müslüm Gürses", 1999, "Vay Canım", ["Nilufer"]],
      ["Batsın Bu Dünya", "Orhan Gencebay", 1975, "Batsın Bu Dünya", ["Batsin Bu Dunya"]],
      ["İtirazım Var", "Müslüm Gürses", 1981, "Mutlu Ol Yeter", ["Itirazim Var"]],
      ["Seni Yazdım", "Müslüm Gürses", 1986, "Küskünüm", ["Seni Yazdim", "Seni Yazdim Kalbime"]],
      ["Emmoğlu", "Ferdi Tayfur", 1992, "Prangalar", ["Emmoglu"]],
      ["Hangimiz Sevmedik", "Müslüm Gürses", 1994, "Senden Vazgeçmem", []],
      ["Affet", "Müslüm Gürses", 2006, "Aşk Tesadüfleri Sever", []],
      ["Unutamadım", "Müslüm Gürses", 1986, "Küskünüm", ["Unutamadim", "Kaç Kadeh Kırıldı"]],
      ["Küskünüm", "Müslüm Gürses", 1986, "Küskünüm", ["Kuskunum"]],
      ["Hatıran Yeter", "Ferdi Tayfur", 1990, "Hoşçakal", ["Hatiran Yeter"]],
      ["Bana Sor", "Ferdi Tayfur", 1990, "Hoşçakal", []],
      ["İçim Yanar", "Ferdi Tayfur", 1988, "İçim Yanar", ["Icim Yanar"]],
      ["Çeşme", "Ferdi Tayfur", 1977, "Çeşme", ["Cesme"]],
      ["Huzurum Kalmadı", "Ferdi Tayfur", 1977, "Huzurum Kalmadı", ["Huzurum Kalmadi"]],
      ["Hatasız Kul Olmaz", "Orhan Gencebay", 1976, "Sarhoşun Biri", ["Hatasiz Kul Olmaz"]],
      ["Dil Yarası", "Orhan Gencebay", 1984, "Dil Yarası", ["Dil Yarasi"]],
      ["Severek Ayrılalım", "Orhan Gencebay", 1971, "Severek Ayrılalım", ["Severek Ayrilalim"]],
      ["Mavi Mavi", "İbrahim Tatlıses", 1985, "Mavi Mavi", []],
      ["Aramam", "İbrahim Tatlıses", 2004, "Aramam", []],
      ["Haydi Söyle", "İbrahim Tatlıses", 1994, "Haydi Söyle", ["Haydi Soyle"]],
      ["Dom Dom Kurşunu", "İbrahim Tatlıses", 1979, "Sabuha", ["Dom Dom Kursunu"]],
      ["Mutlu Ol Yeter", "İbrahim Tatlıses", 1982, "Mutlu Ol Yeter", []],
      ["Sürünüyorum", "Gülden Karaböcek", 1978, "Müzik ve Ben", ["Surunuyorum"]],
      ["Dilek Taşı", "Gülden Karaböcek", 1978, "Müzik ve Ben", ["Dilek Tasi"]],
      ["Tanrım Beni Baştan Yarat", "Emel Sayın", 1974, "Tanrım Beni Baştan Yarat", ["Tanrim Beni Bastan Yarat"]],
      ["Sev Yeter", "Kamuran Akkor", 1983, "Sev Yeter", []],
      ["Gidecek Bir Gün", "Bergen", 1986, "Acıların Kadını", ["Acıların Kadını", "Acilarin Kadini"]],
      ["Sen Affetsen Ben Affetmem", "Bergen", 1986, "Acıların Kadını", []],
      ["Firuze", "Sezen Aksu", 1982, "Firuze", []],
      ["Anlamazdın", "Ayla Dikmen", 1976, "Gözbebeğim", ["Anlamazdin"]]
    ]},
    // 5. TÜRKÇE - TÜRKÇE RAP (30 Şarkı)
    { kod: "tr_rap", dil: "tr", tur: "Türkçe Rap", liste: [
      ["Holocaust", "Ceza", 2002, "Med Cezir", ["Holokost"]],
      ["Yerli Plaka", "Ceza", 2006, "Yerli Plaka", []],
      ["Heyecanı Yok", "Gazapizm", 2017, "Heyecanı Yok", ["Heyecani Yok"]],
      ["Geceler", "Ezhel", 2017, "Müptezhel", []],
      ["Suspus", "Ceza", 2015, "Suspus", ["Sus Pus"]],
      ["Ölüler Dirilerden Çalacak", "Gazapizm", 2018, "Ölüler Dirilerden Çalacak", ["Oluler Dirilerden Calacak"]],
      ["Fark Var", "Ceza", 2006, "Yerli Plaka", []],
      ["Neyim Var Ki", "Ceza", 2004, "Rapstar", []],
      ["Med Cezir", "Ceza", 2002, "Med Cezir", []],
      ["Baytar", "Sagopa Kajmer", 2005, "Romantizma", []],
      ["Al 1'de Burdan Yak", "Sagopa Kajmer", 2004, "Bir Pesimistin Gözyaşları", ["Al Birde Burdan Yak"]],
      ["Galiba", "Sagopa Kajmer", 2011, "Saydam Odalar", []],
      ["Toz Taneleri", "Sagopa Kajmer", 2019, "Sarkastik", []],
      ["İmkansızım", "Ezhel", 2017, "Müptezhel", ["Imkansizim"]],
      ["Şehrimin Tadı", "Ezhel", 2017, "Müptezhel", ["Sehrimin Tadi"]],
      ["Felaket", "Ezhel", 2019, "Felaket", []],
      ["Aya", "Murda", 2019, "Aya", []],
      ["Unutulacak Dünler", "Gazapizm", 2020, "Hiza", ["Unutulacak Dunler"]],
      ["Kime Diyorum", "Ben Fero", 2019, "Orman Kanunları", ["Demet Akalın", "Demet Akalin"]],
      ["Biladerim İçin", "Ben Fero", 2019, "Orman Kanunları", ["Biladerim Icin"]],
      ["Mekanın Sahibi", "Norm Ender", 2019, "Mekanın Sahibi", ["Mekanin Sahibi"]],
      ["Deli", "Norm Ender", 2017, "Aura", []],
      ["Karma", "Şehinşah", 2018, "Karma", []],
      ["Yak Yak Yak", "Şehinşah", 2018, "Yak Yak Yak", []],
      ["Ölüme İnat", "Hidra", 2014, "Holigan", ["Olume Inat"]],
      ["Uçurum Çiçeği", "No.1", 2017, "Siyah Bayrak", ["Dünya Gül Bana", "Dunya Gul Bana"]],
      ["Hiç Işık Yok", "No.1", 2017, "Siyah Bayrak", ["Hic Isik Yok"]],
      ["Mesafe", "Sefo", 2021, "Bilmem Mi?", ["Bilmem Mi"]],
      ["Isabelle", "Sefo", 2022, "Isabelle", []],
      ["Affettim", "Sefo", 2022, "Affettim", []]
    ]},
    // 6. TÜRKÇE - ANADOLU ROCK (30 Şarkı)
    { kod: "tr_ar", dil: "tr", tur: "Anadolu Rock", liste: [
      ["Dönence", "Barış Manço", 1981, "Sözüm Meclisten Dışarı", ["Donence"]],
      ["Resimdeki Gözyaşları", "Cem Karaca", 1968, "Resimdeki Gözyaşları", ["Resimdeki Gozyaslari"]],
      ["Fesuphanallah", "Erkin Koray", 1974, "Elektronik Türküler", ["Fesupanallah"]],
      ["Sarı Çizmeli Mehmet Ağa", "Barış Manço", 1979, "Yeni Bir Gün", ["Sari Cizmeli Mehmet Aga"]],
      ["Gülpembe", "Barış Manço", 1981, "Sözüm Meclisten Dışarı", ["Gulpembe"]],
      ["Islak Islak", "Cem Karaca", 1992, "Nerde Kalmıştık", []],
      ["Alla Beni Pulla Beni", "Barış Manço", 1981, "Sözüm Meclisten Dışarı", []],
      ["Dağlar Dağlar", "Barış Manço", 1970, "Dağlar Dağlar", ["Daglar Daglar"]],
      ["Arkadaşım Eşek", "Barış Manço", 1981, "Sözüm Meclisten Dışarı", ["Arkadasim Esek"]],
      ["Hal Hal", "Barış Manço", 1981, "Sözüm Meclisten Dışarı", []],
      ["Kara Sevda", "Barış Manço", 1989, "Darısı Başınıza", []],
      ["Unutamadım", "Barış Manço", 1986, "Değmesin Yağlı Boya", ["Unutamadim"]],
      ["Tamirci Çırağı", "Cem Karaca", 1975, "Tamirci Çırağı", ["Tamirci Ciragi"]],
      ["Namus Belası", "Cem Karaca", 1974, "Namus Belası", ["Namus Belasi"]],
      ["Bu Son Olsun", "Cem Karaca", 1969, "Bu Son Olsun", []],
      ["Herkes Gibisin", "Cem Karaca", 1979, "Hasret", []],
      ["Ceviz Ağacı", "Cem Karaca", 1987, "Merhaba Gençler", ["Ceviz Agaci"]],
      ["Çöpçüler", "Erkin Koray", 1977, "Tutkusu", ["Copculer"]],
      ["Öyle Bir Geçer Zaman Ki", "Erkin Koray", 1982, "Benden Sana", ["Oyle Bir Gecer Zaman Ki"]],
      ["Şaşkın", "Erkin Koray", 1974, "Elektronik Türküler", ["Saskin"]],
      ["Sevince", "Erkin Koray", 1973, "Mesafeler", []],
      ["Estarabim", "Erkin Koray", 1975, "Estarabim", []],
      ["Neredesin Sen", "Neşet Ertaş", 1988, "Gönül Dağı", []],
      ["Gönül Dağı", "Barış Manço", 1973, "2023", ["Gonul Dagi"]],
      ["Uzun İnce Bir Yoldayım", "Pentagram", 1997, "Anatolia", ["Uzun Ince Bir Yoldayim"]],
      ["Bir Eksiğiz", "Moğollar", 1996, "Dört Renk", ["Bir Eksigiz"]],
      ["Selvi Boylum Al Yazmalım", "Cahit Berkay", 1977, "Film Müzikleri", ["Selvi Boylum Al Yazmalim"]],
      ["Fabrika Kızı", "Alpay", 1972, "Alpay", ["Fabrika Kizi"]],
      ["Eylül'de Gel", "Alpay", 1977, "Eylül'de Gel", ["Eylulde Gel"]],
      ["Aldırma Gönül", "Edip Akbayram", 1977, "Nedir Ne Değildir?", ["Aldirma Gonul"]]
    ]},
    // 7. YABANCI - POP (30 Şarkı)
    { kod: "yb_pop", dil: "yabanci", tur: "Pop", liste: [
      ["Blinding Lights", "The Weeknd", 2019, "After Hours", ["Blinding Light"]],
      ["Billie Jean", "Michael Jackson", 1982, "Thriller", ["Billi Jean"]],
      ["Shape of You", "Ed Sheeran", 2017, "Divide", ["Shape Of You"]],
      ["Rolling in the Deep", "Adele", 2010, "21", ["Rolling In The Deep"]],
      ["Bad Guy", "Billie Eilish", 2019, "When We All Fall Asleep, Where Do We Go?", ["Badguy"]],
      ["Uptown Funk", "Mark Ronson", 2014, "Uptown Special", ["Up Town Funk"]],
      ["Thriller", "Michael Jackson", 1982, "Thriller", []],
      ["Beat It", "Michael Jackson", 1982, "Thriller", []],
      ["Someone Like You", "Adele", 2011, "21", []],
      ["Hello", "Adele", 2015, "25", []],
      ["Starboy", "The Weeknd", 2016, "Starboy", []],
      ["Save Your Tears", "The Weeknd", 2020, "After Hours", []],
      ["Levitating", "Dua Lipa", 2020, "Future Nostalgia", []],
      ["Don't Start Now", "Dua Lipa", 2019, "Future Nostalgia", ["Dont Start Now"]],
      ["New Rules", "Dua Lipa", 2017, "Dua Lipa", []],
      ["Shake It Off", "Taylor Swift", 2014, "1989", []],
      ["Blank Space", "Taylor Swift", 2014, "1989", []],
      ["Anti-Hero", "Taylor Swift", 2022, "Midnights", ["Anti Hero"]],
      ["As It Was", "Harry Styles", 2022, "Harry's House", []],
      ["Watermelon Sugar", "Harry Styles", 2019, "Fine Line", []],
      ["Poker Face", "Lady Gaga", 2008, "The Fame", []],
      ["Bad Romance", "Lady Gaga", 2009, "The Fame Monster", []],
      ["Toxic", "Britney Spears", 2003, "In the Zone", []],
      ["...Baby One More Time", "Britney Spears", 1998, "...Baby One More Time", ["Baby One More Time"]],
      ["Halo", "Beyoncé", 2008, "I Am... Sasha Fierce", []],
      ["Crazy in Love", "Beyoncé", 2003, "Dangerously in Love", []],
      ["Umbrella", "Rihanna", 2007, "Good Girl Gone Bad", []],
      ["Diamonds", "Rihanna", 2012, "Unapologetic", []],
      ["24K Magic", "Bruno Mars", 2016, "24K Magic", []],
      ["Locked Out of Heaven", "Bruno Mars", 2012, "Unorthodox Jukebox", []]
    ]},
    // 8. YABANCI - ROCK (30 Şarkı)
    { kod: "yb_rock", dil: "yabanci", tur: "Rock", liste: [
      ["Smells Like Teen Spirit", "Nirvana", 1991, "Nevermind", ["Teen Spirit"]],
      ["Bohemian Rhapsody", "Queen", 1975, "A Night at the Opera", ["Bohemian Rapsody"]],
      ["In the End", "Linkin Park", 2000, "Hybrid Theory", ["In The End"]],
      ["Do I Wanna Know?", "Arctic Monkeys", 2013, "AM", ["Do I Wanna Know"]],
      ["Numb", "Linkin Park", 2003, "Meteora", []],
      ["Bring Me to Life", "Evanescence", 2003, "Fallen", ["Bring Me To Life"]],
      ["Come As You Are", "Nirvana", 1991, "Nevermind", []],
      ["We Will Rock You", "Queen", 1977, "News of the World", []],
      ["Don't Stop Me Now", "Queen", 1978, "Jazz", ["Dont Stop Me Now"]],
      ["Another One Bites the Dust", "Queen", 1980, "The Game", []],
      ["Hotel California", "Eagles", 1976, "Hotel California", []],
      ["Sweet Child O' Mine", "Guns N' Roses", 1987, "Appetite for Destruction", ["Sweet Child O Mine"]],
      ["November Rain", "Guns N' Roses", 1991, "Use Your Illusion I", []],
      ["Back in Black", "AC/DC", 1980, "Back in Black", []],
      ["Highway to Hell", "AC/DC", 1979, "Highway to Hell", []],
      ["Thunderstruck", "AC/DC", 1990, "The Razors Edge", []],
      ["Enter Sandman", "Metallica", 1991, "Metallica", []],
      ["Nothing Else Matters", "Metallica", 1991, "Metallica", []],
      ["Wonderwall", "Oasis", 1995, "(What's the Story) Morning Glory?", []],
      ["Creep", "Radiohead", 1992, "Pablo Honey", []],
      ["Californication", "Red Hot Chili Peppers", 1999, "Californication", []],
      ["Under the Bridge", "Red Hot Chili Peppers", 1991, "Blood Sugar Sex Magik", []],
      ["Seven Nation Army", "The White Stripes", 2003, "Elephant", []],
      ["Boulevard of Broken Dreams", "Green Day", 2004, "American Idiot", []],
      ["Livin' on a Prayer", "Bon Jovi", 1986, "Slippery When Wet", ["Livin On A Prayer", "Living On A Prayer"]],
      ["It's My Life", "Bon Jovi", 2000, "Crush", ["Its My Life"]],
      ["Paint It, Black", "The Rolling Stones", 1966, "Aftermath", ["Paint It Black"]],
      ["Smoke on the Water", "Deep Purple", 1972, "Machine Head", []],
      ["Dream On", "Aerosmith", 1973, "Aerosmith", []],
      ["Zombie", "The Cranberries", 1994, "No Need to Argue", []]
    ]},
    // 9. YABANCI - HIP-HOP (30 Şarkı)
    { kod: "yb_hh", dil: "yabanci", tur: "Hip-Hop", liste: [
      ["Lose Yourself", "Eminem", 2002, "8 Mile", ["Lose Your Self"]],
      ["In Da Club", "50 Cent", 2003, "Get Rich or Die Tryin'", ["In The Club"]],
      ["Without Me", "Eminem", 2002, "The Eminem Show", ["With Out Me"]],
      ["God's Plan", "Drake", 2018, "Scorpion", ["Gods Plan"]],
      ["HUMBLE.", "Kendrick Lamar", 2017, "DAMN.", ["Humble"]],
      ["Stronger", "Kanye West", 2007, "Graduation", []],
      ["Stan", "Eminem", 2000, "The Marshall Mathers LP", []],
      ["The Real Slim Shady", "Eminem", 2000, "The Marshall Mathers LP", ["Real Slim Shady"]],
      ["Till I Collapse", "Eminem", 2002, "The Eminem Show", []],
      ["Candy Shop", "50 Cent", 2005, "The Massacre", []],
      ["Still D.R.E.", "Dr. Dre", 1999, "2001", ["Still Dre"]],
      ["The Next Episode", "Dr. Dre", 1999, "2001", ["Next Episode"]],
      ["California Love", "2Pac", 1995, "All Eyez on Me", []],
      ["All Eyez on Me", "2Pac", 1996, "All Eyez on Me", ["All Eyes On Me"]],
      ["Juicy", "The Notorious B.I.G.", 1994, "Ready to Die", []],
      ["Hypnotize", "The Notorious B.I.G.", 1997, "Life After Death", []],
      ["Gangsta's Paradise", "Coolio", 1995, "Gangsta's Paradise", ["Gangstas Paradise"]],
      ["Gold Digger", "Kanye West", 2005, "Late Registration", []],
      ["Heartless", "Kanye West", 2008, "808s & Heartbreak", []],
      ["Hotline Bling", "Drake", 2015, "Views", []],
      ["One Dance", "Drake", 2016, "Views", []],
      ["SICKO MODE", "Travis Scott", 2018, "ASTROWORLD", ["Sicko Mode"]],
      ["goosebumps", "Travis Scott", 2016, "Birds in the Trap Sing McKnight", ["Goosebumps"]],
      ["rockstar", "Post Malone", 2017, "beerbongs & bentleys", ["Rockstar"]],
      ["Sunflower", "Post Malone", 2018, "Spider-Man: Into the Spider-Verse", []],
      ["Empire State of Mind", "JAY-Z", 2009, "The Blueprint 3", []],
      ["Ms. Jackson", "Outkast", 2000, "Stankonia", ["Ms Jackson"]],
      ["Hey Ya!", "Outkast", 2003, "Speakerboxxx/The Love Below", ["Hey Ya"]],
      ["Drop It Like It's Hot", "Snoop Dogg", 2004, "R&G", ["Drop It Like Its Hot"]],
      ["Black and Yellow", "Wiz Khalifa", 2010, "Rolling Papers", []]
    ]},
    // 10. YABANCI - ELEKTRONİK (30 Şarkı)
    { kod: "yb_el", dil: "yabanci", tur: "Elektronik", liste: [
      ["Get Lucky", "Daft Punk", 2013, "Random Access Memories", []],
      ["Titanium", "David Guetta", 2011, "Nothing but the Beat", ["Titanyum"]],
      ["Wake Me Up", "Avicii", 2013, "True", []],
      ["Animals", "Martin Garrix", 2013, "Gold Skies", []],
      ["Lean On", "Major Lazer", 2015, "Peace Is the Mission", []],
      ["Summer", "Calvin Harris", 2014, "Motion", []],
      ["One More Time", "Daft Punk", 2000, "Discovery", []],
      ["Around the World", "Daft Punk", 1997, "Homework", []],
      ["Harder, Better, Faster, Stronger", "Daft Punk", 2001, "Discovery", ["Harder Better Faster Stronger"]],
      ["Levels", "Avicii", 2011, "Levels", []],
      ["Hey Brother", "Avicii", 2013, "True", []],
      ["Waiting For Love", "Avicii", 2015, "Stories", []],
      ["Feel So Close", "Calvin Harris", 2011, "18 Months", []],
      ["This Is What You Came For", "Calvin Harris", 2016, "This Is What You Came For", []],
      ["Don't You Worry Child", "Swedish House Mafia", 2012, "Until Now", ["Dont You Worry Child"]],
      ["Clarity", "Zedd", 2012, "Clarity", []],
      ["Faded", "Alan Walker", 2015, "Different World", []],
      ["Alone", "Marshmello", 2016, "Alone", []],
      ["Happier", "Marshmello", 2018, "Happier", []],
      ["Closer", "The Chainsmokers", 2016, "Collage", []],
      ["Something Just Like This", "The Chainsmokers", 2017, "Memories...Do Not Open", []],
      ["Turn Down for What", "DJ Snake", 2013, "Turn Down for What", []],
      ["Taki Taki", "DJ Snake", 2018, "Carte Blanche", []],
      ["Scary Monsters and Nice Sprites", "Skrillex", 2010, "Scary Monsters and Nice Sprites", ["Scary Monsters"]],
      ["Bangarang", "Skrillex", 2011, "Bangarang", []],
      ["Strobe", "deadmau5", 2009, "For Lack of a Better Name", []],
      ["Sandstorm", "Darude", 1999, "Before the Storm", []],
      ["Blue (Da Ba Dee)", "Eiffel 65", 1998, "Europop", ["Blue", "Da Ba Dee"]],
      ["Satisfaction", "Benny Benassi", 2002, "Hypnotica", []],
      ["Firestone", "Kygo", 2014, "Cloud Nine", []]
    ]},
    // 11. YABANCI - CAZ (30 Şarkı)
    { kod: "yb_caz", dil: "yabanci", tur: "Caz", liste: [
      ["Take Five", "The Dave Brubeck Quartet", 1959, "Time Out", ["Take 5"]],
      ["Fly Me to the Moon", "Frank Sinatra", 1964, "It Might as Well Be Swing", ["Fly Me To The Moon"]],
      ["Feeling Good", "Nina Simone", 1965, "I Put a Spell on You", []],
      ["What a Wonderful World", "Louis Armstrong", 1967, "What a Wonderful World", ["What A Wonderful World"]],
      ["Hit the Road Jack", "Ray Charles", 1961, "Ray Charles Greatest Hits", ["Hit The Road Jack"]],
      ["Back to Black", "Amy Winehouse", 2006, "Back to Black", ["Back To Black"]],
      ["So What", "Miles Davis", 1959, "Kind of Blue", []],
      ["My Way", "Frank Sinatra", 1969, "My Way", []],
      ["Strangers in the Night", "Frank Sinatra", 1966, "Strangers in the Night", []],
      ["La Vie En Rose", "Louis Armstrong", 1950, "Satchmo Serenades", []],
      ["Summertime", "Ella Fitzgerald", 1957, "Porgy and Bess", []],
      ["Dream a Little Dream of Me", "Ella Fitzgerald", 1950, "Dream a Little Dream of Me", []],
      ["I Put a Spell on You", "Nina Simone", 1965, "I Put a Spell on You", []],
      ["Georgia on My Mind", "Ray Charles", 1960, "The Genius Hits the Road", []],
      ["Rehab", "Amy Winehouse", 2006, "Back to Black", []],
      ["Valerie", "Amy Winehouse", 2007, "Back to Black", []],
      ["Don't Know Why", "Norah Jones", 2002, "Come Away with Me", ["Dont Know Why"]],
      ["Come Away With Me", "Norah Jones", 2002, "Come Away with Me", []],
      ["Strange Fruit", "Billie Holiday", 1939, "Lady Sings the Blues", []],
      ["My Favorite Things", "John Coltrane", 1961, "My Favorite Things", []],
      ["Blue Train", "John Coltrane", 1958, "Blue Train", []],
      ["Autumn Leaves", "Cannonball Adderley", 1958, "Somethin' Else", []],
      ["The Girl From Ipanema", "Stan Getz", 1964, "Getz/Gilberto", ["Girl From Ipanema"]],
      ["Sing, Sing, Sing", "Benny Goodman", 1937, "The Famous 1938 Carnegie Hall Jazz Concert", ["Sing Sing Sing"]],
      ["In the Mood", "Glenn Miller", 1939, "Glenn Miller", []],
      ["Take the 'A' Train", "Duke Ellington", 1941, "Hollywood Bowl", ["Take The A Train"]],
      ["Unforgettable", "Nat King Cole", 1951, "Unforgettable", []],
      ["L-O-V-E", "Nat King Cole", 1965, "L-O-V-E", ["Love"]],
      ["At Last", "Etta James", 1960, "At Last!", []],
      ["Sway", "Michael Bublé", 2003, "Michael Bublé", []]
    ]}
  ];
})(window.IlkNota = window.IlkNota || {});


/* ---- js/data/sanatci-biyografileri.js ---- */
/* Sanatçı biyografileri: sanatçı adı -> kısa, genel bilgi metni (cevap ekranındaki "Sanatçı ve Hayatı" bölümü) */
(function (App) {
  'use strict';

  App.SANATCI_BIYOGRAFILERI = {
    // ---- Türkçe: Alternatif ----
    "Duman": "Duman, 1999'da İstanbul'da kurulan ve solistliğini Kaan Tangöze'nin yaptığı Türk rock grubudur. Güçlü gitar riffleri ve dinleyiciyle bütünleşen konserleriyle Türkiye'nin en çok sevilen rock gruplarından biri haline geldi.",
    "Göksel": "Göksel, Türk pop müziğinin söz yazarı ve besteci kimliğiyle öne çıkan isimlerinden biridir. Kendine özgü yorumu ve duygusal sözleriyle geniş bir dinleyici kitlesi edindi.",
    "Şebnem Ferah": "Şebnem Ferah, 1990'ların başında Volvox grubunun solisti olarak tanındı. 1996'da yayımladığı ilk solo albümü 'Kadın' ile Türk rock ve pop müziğinin en güçlü kadın seslerinden biri oldu.",
    "Mor ve Ötesi": "Mor ve Ötesi, 1995'te İstanbul'da kurulan ve solistliğini Harun Tekin'in yaptığı Türk rock grubudur. Duyarlı sözleri ve 2008 Eurovision'da Türkiye'yi temsil etmesiyle geniş kitlelere ulaştı.",
    "Model": "Model, Türk alternatif rock sahnesinde yer alan bir gruptur. Melankolik tınıları ve şarkı sözlerindeki edebi dokusuyla tanınır.",
    "Teoman": "Teoman, 1990'ların sonundan itibaren çıkardığı albümlerle Türk rock müziğinin tanınmış sesleri arasına girdi. İçe dönük sözleri ve melankolik anlatımıyla bilinir.",
    "Haluk Levent": "Haluk Levent, Türk rock müziğinin yıllardır sahnede olan sanatçılarındandır. Müziğinin yanı sıra AHBAP platformunun kurucusu olarak yardım faaliyetleriyle de tanınır.",
    "Pinhani": "Pinhani, solistliğini Mutlu Kaya'nın yaptığı bir Türk alternatif pop-rock grubudur. Duygusal ve akılda kalıcı şarkılarıyla 2000'li yıllarda büyük beğeni topladı.",
    "Rafet El Roman": "Rafet El Roman, 1990'lardan itibaren Türk pop müziğinde sevilen romantik şarkılarıyla tanınan bir sanatçıdır. Duygusal baladlarıyla geniş bir hayran kitlesine ulaştı.",
    "Sezen Aksu": "Sezen Aksu, 'Minik Serçe' lakabıyla anılan ve Türk pop müziğinin en etkili isimlerinden biri olan şarkıcı, söz yazarı ve bestecidir. Onlarca yıllık kariyerinde kendi albümlerinin yanı sıra birçok sanatçıya şarkı yazdı.",
    "Ebru Gündeş": "Ebru Gündeş, 1990'lardan bu yana Türk pop ve arabesk-pop müziğinde tanınan bir yorumcudur. Güçlü sesi ve dramatik yorumuyla bilinir.",
    "Mert Demir": "Mert Demir, genç kuşağın tanınan Türk şarkıcı ve söz yazarlarındandır. Modern pop soundunu duygusal sözlerle buluşturan şarkılarıyla dikkat çeker.",
    "Yüzyüzeyken Konuşuruz": "Yüzyüzeyken Konuşuruz, Türk alternatif pop-rock sahnesinde yer alan bir gruptur. Akustik ve samimi tarzıyla özellikle genç dinleyiciler arasında sevildi.",
    "KÖFN": "KÖFN, Türk alternatif müzik sahnesinde yer alan bir gruptur. Gündelik hayattan beslenen sözleri ve enerjik tarzıyla öne çıkar.",
    "Emir Can İğrek": "Emir Can İğrek, hem şarkıcılığı hem de sosyal medyadaki varlığıyla tanınan bir Türk sanatçıdır. Eğlenceli şarkıları ve sahne enerjisiyle genç kitlelerde karşılık buldu.",

    // ---- Türkçe: Pop ----
    "Tarkan": "Tarkan, 1992'de çıkardığı 'Yine Sensiz' albümüyle tanınan ve 'Megastar' olarak anılan Türk pop sanatçısıdır. 'Şımarık' ile Türkiye dışında da büyük bir ilgi gördü ve Türk pop müziğinin en tanınmış ismi haline geldi.",
    "Sertab Erener": "Sertab Erener, 2003 Eurovision Şarkı Yarışması'nı 'Everyway That I Can' ile kazanarak Türkiye'ye ilk birinciliğini getiren sanatçıdır. Pop, caz ve oryantal etkileri harmanlayan geniş bir repertuvara sahiptir.",
    "Gülşen": "Gülşen, hem şarkıcı hem de söz yazarı olarak Türk pop müziğinde uzun yıllardır aktif olan bir sanatçıdır. Eğlenceli ve cesur tarzıyla tanınır.",
    "Aleyna Tilki": "Aleyna Tilki, 2010'ların ikinci yarısında 'Sen Olsan Bari' ile adını duyuran Türk pop sanatçısıdır. Modern pop ve dans müziğiyle genç kitlelerde geniş bir takipçi kitlesi oluşturdu.",
    "Hadise": "Hadise, Belçika'da doğan Türk asıllı şarkıcıdır. 2009 Eurovision'da 'Düm Tek Tek' ile Türkiye'yi temsil etti ve dans pop şarkılarıyla tanındı.",
    "Emrah Karaduman": "Emrah Karaduman, Türk pop müziğinde hem yapımcı hem de besteci olarak öne çıkan bir isimdir. Birçok popüler şarkının arkasındaki imza olarak bilinir.",
    "Simge": "Simge Sağın, 'Miş Miş' gibi şarkılarıyla tanınan Türk pop sanatçısıdır. Enerjik ve dans edilebilir şarkıları ile geniş bir dinleyici kitlesine ulaştı.",
    "Mabel Matiz": "Mabel Matiz, kendine özgü sesi ve sıra dışı yorumuyla öne çıkan Türk şarkıcı ve söz yazarıdır. Pop müziği alternatif ve etnik tınılarla harmanlar.",
    "Edis": "Edis, 2010'lardan itibaren Türk pop ve R&B sahnesinde tanınan bir şarkıcıdır. Modern aranjmanları ve akılda kalıcı melodileriyle bilinir.",
    "Serdar Ortaç": "Serdar Ortaç, 1990'larda 'Karabiberim' gibi şarkılarla Türk pop müziğinde adını duyurdu. Dans pop tarzı ve hit şarkılarıyla uzun süre listelerde yer aldı.",
    "Hande Yener": "Hande Yener, Türk pop müziğinin dans ve elektropop yönündeki tanınmış sanatçılarından biridir. Sahne şovları ve sürekli yenilenen imajıyla bilinir.",

    // ---- Türkçe: 90'lar ----
    "Yonca Evcimik": "Yonca Evcimik, 1990'ların başında 'Abone' şarkısıyla popüler olan Türk pop sanatçısıdır. Dönemin dans pop akımının öne çıkan isimlerinden biriydi.",
    "Mustafa Sandal": "Mustafa Sandal, 'Bandıra Bandıra' gibi şarkılarıyla 1990'lardan itibaren Türk pop müziğinde büyük bir yıldız olan sanatçıdır. Dans pop tarzını Türkiye ve Avrupa'da tanıttı.",
    "Yıldız Tilbe": "Yıldız Tilbe, pop ve arabeski harmanlayan tarzıyla 1990'larda yükselen Türk şarkıcı ve söz yazarıdır. Duygusal ve güçlü şarkıları dinleyici hafızasında yer eder.",
    "Kenan Doğulu": "Kenan Doğulu, Türk pop müziğinin hareketli ve gösterişli sahne performanslarıyla tanınan şarkıcısıdır. 2007 Eurovision'da Türkiye'yi temsil etti.",
    "Burak Kut": "Burak Kut, 1990'lar Türk pop müziğinde adını duyuran sanatçılardandır. Dönemin pop dalgasında kendine yer buldu.",
    "Rüya Ersavcı": "Rüya Ersavcı, 1990'ların Türk pop sahnesinde yer almış bir sanatçıdır. Dönemin hareketli şarkılarıyla hatırlanır.",
    "Cartel": "Cartel, Almanya'da yaşayan Türk gençlerinin kurduğu ve Türkçe rap'i geniş kitlelere ulaştıran gruptur. 1995'te çıkardıkları albümle Türkiye'de hip-hop'un tanınmasında önemli rol oynadılar.",
    "Mirkelam": "Mirkelam, 1990'lar Türk pop müziğinde adı geçen bir gruptur. Dönemin müzik dünyasına kendine özgü pop sound'u getirdi.",
    "Zafer Peker": "Zafer Peker, 1990'lar Türk pop müziğinde yer alan bir şarkıcıdır. Dönemin popüler şarkıları arasında kendine yer buldu.",
    "Hakan Peker": "Hakan Peker, 1990'larda Türk pop müziğinde dans pop tarzıyla tanınan bir şarkıcıdır. Eğlenceli şarkıları dönemin partilerinde çok çalındı.",
    "İzel Çelik Ercan": "İzel, Çelik ve Ercan'dan oluşan üçlü, 1990'lar Türk pop müziğinde tanınan bir gruptur. Üç farklı sesin uyumuyla dikkat çektiler.",
    "Ahmet": "Ahmet, 1990'lar Türk pop sahnesinde yer alan bir şarkıcıdır. Dönemin pop şarkılarıyla hafızalarda kaldı.",
    "Emel Müftüoğlu": "Emel Müftüoğlu, 1990'ların Türk pop müziğinde tanınan sanatçılarından biridir. Dönemin pop şarkılarıyla adını duyurdu.",
    "Levent Yüksel": "Levent Yüksel, Türk pop-rock müziğinin tanınan şarkıcılarındandır. 1990'lardan bu yana duygusal yorumlarıyla hafızalarda yer eder.",

    // ---- Türkçe: Arabesk ----
    "Müslüm Gürses": "Müslüm Gürses, 'Müslüm Baba' lakabıyla anılan ve arabesk müziğin en büyük isimlerinden biri olan şarkıcıdır. Kendine has sesi ve yorumuyla farklı kuşaklardan dinleyicilere ulaştı.",
    "Orhan Gencebay": "Orhan Gencebay, 'arabeskin babası' olarak anılan ve bağlama virtüözü olarak da tanınan sanatçıdır. Batı ve doğu müziğini harmanlayan bestelerinde bir çığır açtı.",
    "Ferdi Tayfur": "Ferdi Tayfur, arabesk müziğin en çok sevilen isimlerinden biri olan şarkıcı ve aynı zamanda oyuncudur. Dramatik yorumu ve sinema filmleriyle geniş kitlelere ulaştı.",
    "İbrahim Tatlıses": "İbrahim Tatlıses, 'İbo' lakabıyla bilinen Şanlıurfa doğumlu şarkıcı ve oyuncudur. Türk halk müziği ve arabesk alanlarında büyük bir ün kazandı.",
    "Gülden Karaböcek": "Gülden Karaböcek, arabesk ve Türk pop müziğinde tanınan sert ve güçlü sesli bir sanatçıdır. 1970'lerden itibaren sahnede etkili oldu.",
    "Emel Sayın": "Emel Sayın, Türk sanat müziğinin sevilen yorumcularından biridir. Duygusal ve zarif yorumuyla tanınır.",
    "Kamuran Akkor": "Kamuran Akkor, Türk müziğinde arabesk ve sanat müziği alanında yer alan sanatçılardandır. Duygusal yorumlarıyla bilinir.",
    "Bergen": "Bergen, arabesk müziğin ünlü kadın seslerinden biridir. 'Acıların Kadını' lakabıyla anılır ve hayat hikâyesi şarkılarına yansır.",
    "Ayla Dikmen": "Ayla Dikmen, 1970'lerde Türk müziğinde arabesk ve pop alanında tanınan bir sanatçıdır. Dramatik yorumlarıyla hatırlanır.",

    // ---- Türkçe: Rap ----
    "Ceza": "Ceza, Türkçe rap'in en tanınmış isimlerinden biridir. Hızlı flow tekniği ve toplumsal temalı sözleriyle Türk hip-hop sahnesinde büyük bir etki yarattı.",
    "Gazapizm": "Gazapizm, sert vokal tonu ve toplumsal eleştiri içeren sözleriyle tanınan Türk rap sanatçısıdır. Politik ve sosyal temaları şarkılarına taşır.",
    "Ezhel": "Ezhel, 2010'ların ikinci yarısında Türk rap sahnesinin en tanınmış isimlerinden biri haline gelen sanatçıdır. 'Müptezhel' albümü ile geniş bir kitleye ulaştı.",
    "Sagopa Kajmer": "Sagopa Kajmer, melankolik sözleri ve kendine özgü altyapılarıyla Türk rap müziğinin kült isimlerinden biridir. Hem söz yazarı hem de yapımcı olarak etkili oldu.",
    "Murda": "Murda, Türk rap sahnesinde ve trap tarzında tanınan bir sanatçıdır. Modern altyapıları ve melodik tarzıyla dikkat çekti.",
    "Ben Fero": "Ben Fero, sokak temalı sözleri ve sert tarzıyla tanınan Türk rap sanatçısıdır. 2010'ların sonunda Türk hip-hop'unda adını duyurdu.",
    "Norm Ender": "Norm Ender, hızlı ve teknik rap tarzıyla bilinen Türk sanatçıdır. Hem sözleri hem de akıcı flow'uyla Türk rap'te öne çıkar.",
    "Şehinşah": "Şehinşah, karanlık ve sıra dışı tarzıyla tanınan Türk rap sanatçısıdır. Sözleri ve sahne kimliğiyle dikkat çekti.",
    "Hidra": "Hidra, Türk rap sahnesinde yer alan bir sanatçıdır. Sert sözleri ve vokal tarzıyla bilinir.",
    "No.1": "No.1, Türk rap sahnesinde tanınan bir sanatçıdır. Melodik ve duygusal şarkılarıyla genç dinleyiciler arasında sevildi.",
    "Sefo": "Sefo, 2020'lerde Türk rap sahnesinde adını duyuran sanatçılardandır. Melodik tarzı ve etkileyici şarkılarıyla öne çıktı.",

    // ---- Türkçe: Anadolu Rock ----
    "Barış Manço": "Barış Manço, Anadolu rock'ın öncülerinden biri olan ve çocuk programı '7'den 77'ye' ile de tanınan sanatçıdır. 1999'da hayatını kaybetti; müziği ve kişiliği hâlâ geniş bir sevgiyle anılır.",
    "Cem Karaca": "Cem Karaca, Anadolu rock'ın en önemli isimlerinden biri olan şarkıcı ve söz yazarıdır. Güçlü sesi ve toplumsal temalı şarkılarıyla Türk rock tarihinde derin bir iz bıraktı; 2004'te hayatını kaybetti.",
    "Erkin Koray": "Erkin Koray, Türk rock müziğinin öncülerinden biridir. Elektro gitar ve elektrobağlama kullanımıyla Anadolu rock'ın şekillenmesinde önemli rol oynadı.",
    "Neşet Ertaş": "Neşet Ertaş, Kırşehir doğumlu bir halk müziği ustasıdır. Bozlak geleneğini temsil eden ve bağlama çalışıyla tanınan 'Bozlak Ustası' olarak bilinir.",
    "Pentagram": "Pentagram, Türk heavy metal sahnesinin öncü gruplarından biridir. Türkçe ve İngilizce sözlü şarkılarıyla hem Türkiye'de hem Avrupa'da tanındı.",
    "Moğollar": "Moğollar, Türk rock ve Anadolu rock'ının kurucu gruplarından biridir. Folk melodilerini rock ve progressive öğelerle harmanlayarak yeni bir sound yarattı.",
    "Cahit Berkay": "Cahit Berkay, Moğollar grubunun kurucusu olan gitarist ve bestecidir. Anadolu rock'ın gelişmesinde önemli katkıları vardır.",
    "Alpay": "Alpay, 1960'lardan itibaren Türk pop ve rock müziğinde yer alan sanatçıdır. Sahne performansı ve söz yazarlığıyla bilinir.",
    "Edip Akbayram": "Edip Akbayram, Anadolu rock'ın tanınmış isimlerinden biridir. Halk müziği ve rock'ı birleştiren tarzıyla 1970'lerde büyük sevgi topladı.",

    // ---- Yabancı: Pop ----
    "The Weeknd": "The Weeknd, Kanadalı şarkıcı ve söz yazarı Abel Tesfaye'nin sahne adıdır. R&B, pop ve synthwave'i harmanlayan sound'uyla dünya çapında listelerde zirveye yerleşti.",
    "Michael Jackson": "Michael Jackson, 'Pop'un Kralı' olarak anılan Amerikalı şarkıcı, dansçı ve söz yazarıdır. 1982 tarihli 'Thriller' albümü, tüm zamanların en çok satan albümleri arasındadır.",
    "Ed Sheeran": "Ed Sheeran, İngiliz şarkıcı ve söz yazarıdır. Akustik gitarı ve loop pedalıyla verdiği tek kişilik performanslarla küresel bir üne kavuştu.",
    "Adele": "Adele, güçlü ve duygusal sesiyle tanınan İngiliz şarkıcı ve söz yazarıdır. '21' albümüyle büyük bir başarı yakaladı ve çok sayıda Grammy ödülü kazandı.",
    "Billie Eilish": "Billie Eilish, Amerikalı genç şarkıcı ve söz yazarıdır. Abisi Finneas ile yaptığı yaratıcı ve karanlık tonlu pop şarkılarıyla kısa sürede dünya çapında üne ulaştı.",
    "Mark Ronson": "Mark Ronson, İngiliz-Amerikalı müzik yapımcısı ve DJ'dir. Retro soul ve funk tınılarını modern prodüksiyonla birleştiren işleriyle tanınır.",
    "Dua Lipa": "Dua Lipa, İngiliz şarkıcı ve söz yazarıdır. Disko ve dans pop ağırlıklı 'Future Nostalgia' albümüyle küresel bir yıldız haline geldi.",
    "Taylor Swift": "Taylor Swift, country müzikle başlayan kariyerini pop'a taşıyan Amerikalı şarkıcı ve söz yazarıdır. Kendi şarkılarını yazması ve albüm başarılarıyla tanınır.",
    "Harry Styles": "Harry Styles, One Direction grubunun üyesi olarak tanındıktan sonra solo kariyerine yönelen İngiliz şarkıcı ve oyuncudur. Pop ve rock etkileri taşıyan tarzıyla başarı yakaladı.",
    "Lady Gaga": "Lady Gaga, pop müzik ve gösterişli sahne performanslarıyla tanınan Amerikalı şarkıcı, söz yazarı ve oyuncudur. Sıra dışı imajı ve geniş müzikal yelpazesiyle öne çıkar.",
    "Britney Spears": "Britney Spears, 1990'ların sonunda yükselen ve pop müziğin en büyük isimlerinden biri haline gelen Amerikalı şarkıcıdır. '...Baby One More Time' ile dünya çapında bir fenomen oldu.",
    "Beyoncé": "Beyoncé, Destiny's Child grubunun solisti olarak tanınan ve solo kariyerinde R&B ve pop'un en büyük isimlerinden biri olan Amerikalı şarkıcıdır. Çok sayıda Grammy ödülüne sahiptir.",
    "Rihanna": "Rihanna, Barbados doğumlu şarkıcı ve iş insanıdır. Pop ve R&B alanında çok sayıda listelerde zirve yapan şarkısıyla tanınır.",
    "Bruno Mars": "Bruno Mars, Hawaii doğumlu Amerikalı şarkıcı, söz yazarı ve yapımcıdır. Funk, soul ve pop'u harmanlayan canlı performanslarıyla bilinir.",

    // ---- Yabancı: Rock ----
    "Nirvana": "Nirvana, 1980'lerin sonunda Amerika'nın Washington eyaletinde kurulan ve grunge akımının en önemli grubu olan rock grubudur. Solist Kurt Cobain 1994'te hayatını kaybetti.",
    "Queen": "Queen, 1970'te Londra'da kurulan İngiliz rock grubudur. Solist Freddie Mercury'nin eşsiz vokali ve grubun teatral tarzıyla rock tarihinin en büyük gruplarından biri oldu.",
    "Linkin Park": "Linkin Park, Kaliforniya'da kurulan ve rock ile hip-hop'u harmanlayan Amerikan gruptur. Solist Chester Bennington 2017'de hayatını kaybetti.",
    "Arctic Monkeys": "Arctic Monkeys, İngiltere'nin Sheffield kentinde kurulan indie rock grubudur. Alex Turner'ın sözleri ve sert gitar sound'uyla 2000'lerin en etkili gruplarından biri oldu.",
    "Evanescence": "Evanescence, Arkansas'ta kurulan Amerikan rock grubudur. Amy Lee'nin operatik vokalini gotik ve alternatif rock'la buluşturan tarzıyla tanınır.",
    "Eagles": "Eagles, Los Angeles'ta kurulan Amerikan rock grubudur. Country rock ve soft rock tarzıyla 1970'lerin en başarılı gruplarından biri oldu.",
    "Guns N' Roses": "Guns N' Roses, 1985'te Los Angeles'ta kurulan Amerikan hard rock grubudur. Gitar soloları ve sert sound'uyla 1980'ler sonu rock sahnesinde büyük etki yarattı.",
    "AC/DC": "AC/DC, Avustralya'da kurulan hard rock grubudur. Kalıplaşmış riff'leri ve sert tarzıyla dünya çapında bir rock klasiği haline geldi.",
    "Metallica": "Metallica, 1981'de Los Angeles'ta kurulan Amerikan heavy metal grubudur. Metal müziğin en büyük ve etkili gruplarından biri kabul edilir.",
    "Oasis": "Oasis, Gallagher kardeşler önderliğinde Manchester'da kurulan İngiliz rock grubudur. 1990'ların Britpop akımının başlıca temsilcilerinden biriydi.",
    "Radiohead": "Radiohead, İngiltere'nin Oxfordshire bölgesinde kurulan alternatif rock grubudur. Deneysel yaklaşımı ve yenilikçi albümleriyle tanınır.",
    "Red Hot Chili Peppers": "Red Hot Chili Peppers, Los Angeles'ta kurulan Amerikan funk rock grubudur. Funk, punk ve rock'ı harmanlayan canlı sound'larıyla dünyaca ünlüdür.",
    "The White Stripes": "The White Stripes, Detroit'ten Jack White ve Meg White'ın oluşturduğu ikili garage rock grubudur. Minimalist ve ham sound'larıyla 2000'lerde büyük ses getirdiler.",
    "Green Day": "Green Day, Kaliforniya'da kurulan Amerikan punk rock grubudur. 'American Idiot' albümüyle punk'ı geniş kitlelere ulaştırdı.",
    "Bon Jovi": "Bon Jovi, New Jersey'de kurulan Amerikan rock grubudur. 1980'lerden itibaren stadyum rock sound'uyla geniş bir hayran kitlesine ulaştı.",
    "The Rolling Stones": "The Rolling Stones, 1962'de Londra'da kurulan İngiliz rock grubudur. Blues kökenli rock sound'larıyla rock'n roll'un en uzun soluklu gruplarından biridir.",
    "Deep Purple": "Deep Purple, İngiltere'de kurulan hard rock ve heavy metal'in öncü gruplarındandır. Gitar riff'leri ve klavye ağırlıklı sound'uyla bilinir.",
    "Aerosmith": "Aerosmith, Boston'da kurulan Amerikan hard rock grubudur. Blues temelli sert rock sound'uyla 'Amerika'nın en iyi rock'n roll grubu' olarak anıldı.",
    "The Cranberries": "The Cranberries, İrlanda'nın Limerick kentinde kurulan alternatif rock grubudur. Solist Dolores O'Riordan'ın kendine özgü sesiyle tanınır.",

    // ---- Yabancı: Hip-Hop ----
    "Eminem": "Eminem, Detroit'li Amerikalı rapçi ve söz yazarıdır. Teknik rap becerisi ve kişisel temalı sözleriyle dünyanın en çok satan rap sanatçılarından biri oldu.",
    "50 Cent": "50 Cent, New York'un Queens bölgesinden Amerikalı rapçi ve iş insanıdır. 'Get Rich or Die Tryin'' albümüyle küresel bir isim haline geldi.",
    "Drake": "Drake, Kanadalı rapçi, şarkıcı ve söz yazarıdır. Hip-hop ve R&B'yi birleştiren tarzıyla streaming çağının en başarılı sanatçılarından biridir.",
    "Kendrick Lamar": "Kendrick Lamar, Compton doğumlu Amerikalı rapçidir. 'DAMN.' albümüyle Pulitzer Müzik Ödülü kazanan ilk hip-hop sanatçısı oldu.",
    "Kanye West": "Kanye West, Chicago doğumlu Amerikalı rapçi ve yapımcıdır. Yenilikçi prodüksiyonları ve sample'ları kullanımıyla hip-hop'un yönünü etkiledi.",
    "Dr. Dre": "Dr. Dre, Compton doğumlu Amerikalı rapçi ve yapımcıdır. N.W.A grubunun üyesi olarak başladı ve Eminem, 50 Cent gibi sanatçıları öne çıkardı.",
    "2Pac": "2Pac, Amerikalı rapçi ve oyuncudur. Güçlü sözleri ve toplumsal temalarıyla hip-hop tarihinin en etkili isimlerinden biridir; 1996'da hayatını kaybetti.",
    "The Notorious B.I.G.": "The Notorious B.I.G., Brooklyn doğumlu Amerikalı rapçidir. Akıcı flow'u ve hikâye anlatımıyla doğu yakası hip-hop'unun simgesi oldu; 1997'de hayatını kaybetti.",
    "Coolio": "Coolio, Los Angeles doğumlu Amerikalı rapçidir. 'Gangsta's Paradise' şarkısıyla 1990'ların ortasında dünya çapında üne kavuştu.",
    "Travis Scott": "Travis Scott, Houston doğumlu Amerikalı rapçi ve yapımcıdır. Trap tabanlı sound'u ve sahne şovlarıyla tanınır.",
    "Post Malone": "Post Malone, hip-hop, pop ve rock'ı harmanlayan Amerikalı şarkıcı ve rapçidir. Türler arası geçişleriyle geniş bir kitleye ulaştı.",
    "JAY-Z": "JAY-Z, Brooklyn doğumlu Amerikalı rapçi ve iş insanıdır. Hip-hop dünyasının en etkili ve zengin isimlerinden biridir.",
    "Outkast": "Outkast, Atlanta'dan André 3000 ve Big Boi'nin oluşturduğu hip-hop ikilisidir. Deneysel ve yenilikçi sound'larıyla güney hip-hop'unu dünyaya tanıttılar.",
    "Snoop Dogg": "Snoop Dogg, Long Beach doğumlu Amerikalı rapçidir. Rahat flow'u ve karizmatik kişiliğiyle batı yakası hip-hop'unun simgelerinden biridir.",
    "Wiz Khalifa": "Wiz Khalifa, Pittsburgh doğumlu Amerikalı rapçidir. 'Black and Yellow' şarkısıyla 2010'ların başında büyük bir başarı yakaladı.",

    // ---- Yabancı: Elektronik ----
    "Daft Punk": "Daft Punk, 1993'te Paris'te kurulan Fransız elektronik müzik ikilisidir. Robot kostümleri ve yenilikçi house sound'larıyla tanındılar; 2021'de dağıldıklarını duyurdular.",
    "David Guetta": "David Guetta, Fransız DJ ve prodüktördür. Pop şarkıcılarla yaptığı işbirlikleriyle elektronik dans müziğini ana akıma taşıdı.",
    "Avicii": "Avicii, İsveçli DJ ve prodüktör Tim Bergling'in sahne adıdır. Folk ve country öğelerini elektronik müzikle birleştirdi; 2018'de hayatını kaybetti.",
    "Martin Garrix": "Martin Garrix, Hollandalı DJ ve prodüktördür. Çok genç yaşta 'Animals' ile uluslararası üne kavuştu ve big room house'un öne çıkan isimlerinden oldu.",
    "Major Lazer": "Major Lazer, Amerikalı prodüktör Diplo'nun öncülüğünde kurulan elektronik müzik projesidir. Dancehall, moombahton ve pop'u harmanlayan sound'uyla tanınır.",
    "Calvin Harris": "Calvin Harris, İskoç DJ, prodüktör ve söz yazarıdır. Pop ve dans müziğini birleştiren hitleriyle elektronik müziğin en başarılı isimlerinden biri oldu.",
    "Swedish House Mafia": "Swedish House Mafia, Axwell, Steve Angello ve Sebastian Ingrosso'dan oluşan İsveçli house müzik üçlüsüdür. Festival sahnelerinin en ünlü gruplarından biridir.",
    "Zedd": "Zedd, Rusya doğumlu ve Almanya'da büyüyen DJ ve prodüktör Anton Zaslavski'nin sahne adıdır. Elektronik müziği pop ile harmanlayan sound'uyla tanınır.",
    "Alan Walker": "Alan Walker, Norveç merkezli İngiliz-Norveçli DJ ve prodüktördür. 'Faded' şarkısıyla kısa sürede küresel bir üne kavuştu.",
    "Marshmello": "Marshmello, maskeli sahne kimliğiyle tanınan Amerikalı DJ ve prodüktördür. Elektronik ve pop'u birleştiren şarkılarıyla milyarlarca dinlenme topladı.",
    "The Chainsmokers": "The Chainsmokers, Amerikalı DJ ikilisidir. Elektronik ve pop müziği harmanlayan hitleriyle 2010'ların ortasında büyük başarı yakaladı.",
    "DJ Snake": "DJ Snake, Fransız DJ ve prodüktör William Grigahcine'in sahne adıdır. Trap, elektronik ve dünya müziğini harmanlayan işleriyle bilinir.",
    "Skrillex": "Skrillex, Amerikalı DJ ve prodüktördür. Dubstep'in ana akıma taşınmasında önemli rol oynadı ve çok sayıda Grammy ödülü kazandı.",
    "deadmau5": "deadmau5, Kanadalı elektronik müzik prodüktörüdür. Fare başı şeklindeki maskesi ve progressive house sound'uyla tanınır.",
    "Darude": "Darude, Finlandiyalı DJ ve prodüktördür. 1999 tarihli 'Sandstorm' parçasıyla dünya çapında bir dans müziği klasiğine imza attı.",
    "Eiffel 65": "Eiffel 65, İtalyan eurodance grubudur. 1998 tarihli 'Blue (Da Ba Dee)' şarkısıyla dünya çapında büyük başarı elde etti.",
    "Benny Benassi": "Benny Benassi, İtalyan DJ ve prodüktördür. 'Satisfaction' şarkısıyla elektro house'u geniş kitlelere ulaştırdı.",
    "Kygo": "Kygo, Norveçli DJ ve prodüktördür. Tropikal house tarzının öncülerinden biri olarak tanınır.",

    // ---- Yabancı: Caz ----
    "The Dave Brubeck Quartet": "The Dave Brubeck Quartet, piyanist Dave Brubeck'in önderliğindeki Amerikan caz kuartetidir. 1959 tarihli 'Time Out' albümü ve 'Take Five' parçasıyla cazın en tanınmış isimlerinden biri oldular.",
    "Frank Sinatra": "Frank Sinatra, 20. yüzyılın en ünlü Amerikalı şarkıcılarından biridir. Swing ve geleneksel pop alanındaki yorumlarıyla ölümsüzleşti.",
    "Nina Simone": "Nina Simone, caz, soul, blues ve klasik müziği harmanlayan Amerikalı şarkıcı, piyanist ve sivil haklar aktivistidir. 'High Priestess of Soul' olarak anılır.",
    "Louis Armstrong": "Louis Armstrong, New Orleans doğumlu Amerikalı trompetçi ve şarkıcıdır. Cazın gelişmesinde ve dünyaya yayılmasında büyük rol oynadı.",
    "Ray Charles": "Ray Charles, Amerikalı piyanist ve şarkıcıdır. Gospel, blues ve caz'ı birleştirerek soul müziğin öncülerinden biri oldu.",
    "Amy Winehouse": "Amy Winehouse, İngiliz şarkıcı ve söz yazarıdır. Caz, soul ve R&B'yi harmanlayan 'Back to Black' albümüyle büyük bir başarı yakaladı; 2011'de hayatını kaybetti.",
    "Miles Davis": "Miles Davis, Amerikalı trompetçi ve caz müziğinin en yenilikçi isimlerinden biridir. 1959 tarihli 'Kind of Blue' albümü tüm zamanların en önemli caz kayıtlarından kabul edilir.",
    "Ella Fitzgerald": "Ella Fitzgerald, 'First Lady of Song' olarak anılan Amerikalı caz şarkıcısıdır. Berrak sesi ve scat şarkı söyleme becerisiyle tanınır.",
    "Norah Jones": "Norah Jones, Amerikalı şarkıcı, piyanist ve söz yazarıdır. Caz, country ve pop etkilerini harmanlayan sakin tarzıyla bilinir; sitar ustası Ravi Shankar'ın kızıdır.",
    "Billie Holiday": "Billie Holiday, 'Lady Day' olarak anılan Amerikalı caz şarkıcısıdır. Duygusal yorumuyla cazın en etkileyici seslerinden biri kabul edilir.",
    "John Coltrane": "John Coltrane, Amerikalı caz saksofoncusu ve bestecidir. Armonik yenilikleri ve manevi derinliğiyle caz tarihinin en etkili isimlerinden biridir.",
    "Cannonball Adderley": "Cannonball Adderley, Amerikalı caz saksofoncusudur. Hard bop ve soul jazz tarzındaki canlı performanslarıyla tanınır.",
    "Stan Getz": "Stan Getz, Amerikalı caz saksofoncusudur. Bossa nova'yı Amerika'ya tanıtan 'Getz/Gilberto' albümüyle büyük üne kavuştu.",
    "Benny Goodman": "Benny Goodman, 'Swing'in Kralı' olarak anılan Amerikalı klarnetçi ve orkestra şefidir. 1930'larda swing çağının simgesi haline geldi.",
    "Glenn Miller": "Glenn Miller, 1930'ların ve 40'ların en popüler Amerikalı big band liderlerinden biridir. 1944'te uçağının kaybolmasıyla hayatını kaybetti.",
    "Duke Ellington": "Duke Ellington, Amerikalı piyanist, besteci ve orkestra şefidir. Yarım yüzyıla yayılan kariyeriyle cazın en büyük bestecilerinden biri kabul edilir.",
    "Nat King Cole": "Nat King Cole, Amerikalı caz piyanisti ve şarkıcıdır. Yumuşak ve sıcak sesiyle pop müziğin en sevilen yorumcularından biri oldu.",
    "Etta James": "Etta James, Amerikalı blues, soul ve R&B şarkıcısıdır. Güçlü ve duygusal sesi ile 'At Last' şarkısıyla ölümsüzleşti.",
    "Michael Bublé": "Michael Bublé, Kanadalı şarkıcıdır. Swing ve caz standartlarını modern bir şekilde yorumlayarak geniş bir dinleyici kitlesine ulaştı."
  };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/data/sarkilar.js ---- */
/* Şarkı veritabanından düz şarkı listesini üretir ve filtreleme yardımcısını sunar */
(function (App) {
  'use strict';

  const SARKILAR = [];

  App.SARKI_VERITABANI.forEach(grup => {
    grup.liste.forEach((kayit, idx) => {
      const num = String(idx + 1).padStart(2, "0");
      const id = `${grup.kod}_${num}`;
      const [ad, sanatci, yil, album, alt] = kayit;
      const ozel = App.OZEL_DETAYLAR[id];
      SARKILAR.push({
        id: id,
        dil: grup.dil,
        tur: grup.tur,
        ad: ad,
        alternatifAdlar: alt || [],
        sanatci: sanatci,
        yil: yil,
        album: album,
        sure_sn: 30,
        sanatciBiyografi: App.SANATCI_BIYOGRAFILERI[sanatci] || `${sanatci}, İLK NOTA'nın ${grup.tur} kategorisinde yer alan sanatçılardandır. ${yil} yılında yayımlanan '${album}' albümüyle bu listede anılır.`,
        ses_url: "",
        hikaye: ozel ? ozel[0] : `${sanatci} tarafından ${yil} yılında yayınlanan '${album}' albümünün öne çıkan ve ${grup.tur} kategorisinde iz bırakan sevilen eserlerinden biridir.`,
        ekBilgi: ozel ? ozel[1] : `'${ad}', yayınlandığı yıldan itibaren ${sanatci} diskografisinin en çok dinlenen ve hatırlanan kayıtları arasında yer almaktadır.`
      });
    });
  });

  function getUygunSarkilar(dil, seciliTurler, adimSn) {
    const minSure = 3 * adimSn;
    // Aynı şarkı iki kategoride geçiyorsa (ör. Fırtınalar) bir oyunda yalnızca bir kez gelsin
    const gorulen = new Set();
    return SARKILAR.filter(s => {
      const dilUyar = s.dil === dil;
      const turUyar = seciliTurler.includes(s.tur);
      const sureUyar = s.sure_sn >= minSure;
      if (!(dilUyar && turUyar && sureUyar)) return false;
      const anahtar = `${s.ad}|${s.sanatci}`.toLowerCase();
      if (gorulen.has(anahtar)) return false;
      gorulen.add(anahtar);
      return true;
    });
  }

  App.SARKILAR = SARKILAR;
  App.getUygunSarkilar = getUygunSarkilar;
})(window.IlkNota = window.IlkNota || {});


/* ---- js/storage.js ---- */
/* Güvenli bellek & localStorage yönetimi, uygulama durumu, yedekleme (dışa/içe aktarma) */
(function (App) {
  'use strict';

  const { KATEGORILER, STORAGE_KEY, ESKI_STORAGE_KEY, GECERLI_TUR_SAYISI, GECERLI_MODLAR } = App;
  const memoryFallbackStore = {};

  const YEDEK_ONEKI = "ILKNOTA1:";

  function safeGetStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return memoryFallbackStore[key] || null;
    }
  }

  function safeSetStorage(key, val) {
    try {
      window.localStorage.setItem(key, val);
    } catch (e) {
      memoryFallbackStore[key] = val;
    }
  }

  const varsayilanDurum = {
    ayarlar: {
      dil: "tr",
      turler: [...KATEGORILER.tr],
      adim_sn: 4,
      adim_ozel: false,
      tur_sayisi: 5,
      mod: "klasik",
      sessiz: false
    },
    en_yuksek_puan: 0,
    gecmis: [],
    tutorial_tamamlandi: false,
    profil: { isim: "", avatar: App.AVATARLAR[0] },
    koleksiyon: [],
    basarim: {
      giris_serisi: 0,
      en_uzun_giris: 0,
      son_giris: "",
      dogru_serisi: 0,
      en_iyi_dogru_serisi: 0,
      toplam_oyun: 0,
      toplam_dogru: 0,
      ilk_asama_dogru: 0,
      mukemmel_oyun: 0,
      rozetler: {}
    }
  };

  const kopya = (obj) => JSON.parse(JSON.stringify(obj));

  /* Uygulama durumu tek bir nesnedir; yükleme/sıfırlama/içe aktarma bu nesneyi yerinde günceller */
  const appState = kopya(varsayilanDurum);

  /* Adım süresi 0.1 sn hassasiyetinde, 0.1 - 10 sn arasında tutulur */
  function adimSnDuzelt(deger) {
    const n = Number(deger);
    if (!isFinite(n)) return null;
    return Math.min(10, Math.max(0.1, Math.round(n * 10) / 10));
  }

  /* Ham kayıt verisini varsayılanlarla birleştirir ve bozuk değerleri ayıklar */
  function durumuTemizle(parsed) {
    if (!parsed || typeof parsed !== "object" || !parsed.ayarlar) return null;

    const birlesik = {
      ...kopya(varsayilanDurum),
      ...parsed,
      ayarlar: { ...kopya(varsayilanDurum.ayarlar), ...parsed.ayarlar }
    };

    // Bozuk / elle değiştirilmiş kayıtlara karşı koruma
    if (!KATEGORILER[birlesik.ayarlar.dil]) birlesik.ayarlar.dil = "tr";
    const adim = adimSnDuzelt(birlesik.ayarlar.adim_sn);
    birlesik.ayarlar.adim_sn = adim === null ? varsayilanDurum.ayarlar.adim_sn : adim;
    birlesik.ayarlar.adim_ozel = birlesik.ayarlar.adim_ozel === true;
    if (!GECERLI_TUR_SAYISI.includes(birlesik.ayarlar.tur_sayisi)) birlesik.ayarlar.tur_sayisi = varsayilanDurum.ayarlar.tur_sayisi;
    if (!GECERLI_MODLAR.includes(birlesik.ayarlar.mod)) birlesik.ayarlar.mod = varsayilanDurum.ayarlar.mod;
    if (!Array.isArray(birlesik.gecmis)) birlesik.gecmis = [];
    if (typeof birlesik.en_yuksek_puan !== "number" || !isFinite(birlesik.en_yuksek_puan)) birlesik.en_yuksek_puan = 0;

    // Eski oyuncular (kayıtlı oyunu/rekoru olanlar) rehberi tamamlamış sayılır
    if (typeof birlesik.tutorial_tamamlandi !== "boolean") {
      birlesik.tutorial_tamamlandi = birlesik.gecmis.length > 0 || birlesik.en_yuksek_puan > 0;
    }

    // Profil
    const pr = birlesik.profil && typeof birlesik.profil === "object" ? birlesik.profil : {};
    birlesik.profil = {
      isim: typeof pr.isim === "string" ? pr.isim.slice(0, 20) : "",
      avatar: App.AVATARLAR.includes(pr.avatar) ? pr.avatar : App.AVATARLAR[0]
    };

    // Koleksiyon: yalnızca bilinen şarkılar, tekrarsız
    const bilinenIdler = new Set(App.SARKILAR.map(s => s.id));
    const gorulenIdler = new Set();
    birlesik.koleksiyon = (Array.isArray(birlesik.koleksiyon) ? birlesik.koleksiyon : []).filter(k => {
      if (!k || !bilinenIdler.has(k.id) || gorulenIdler.has(k.id)) return false;
      gorulenIdler.add(k.id);
      return true;
    }).map(k => ({ id: k.id, tarih_iso: typeof k.tarih_iso === "string" ? k.tarih_iso : "" }));

    // Başarımlar: eski oyuncular için sayaçlar mevcut geçmişten tohumlanır
    const ham = parsed.basarim && typeof parsed.basarim === "object" ? parsed.basarim : null;
    const sayi = (v) => (typeof v === "number" && isFinite(v) && v >= 0 ? Math.floor(v) : 0);
    const gecmisTurlari = birlesik.gecmis.flatMap(g => (g && Array.isArray(g.turlar) ? g.turlar : []));
    const basarim = {
      giris_serisi: sayi(ham && ham.giris_serisi),
      en_uzun_giris: sayi(ham && ham.en_uzun_giris),
      son_giris: ham && typeof ham.son_giris === "string" ? ham.son_giris : "",
      dogru_serisi: sayi(ham && ham.dogru_serisi),
      en_iyi_dogru_serisi: sayi(ham && ham.en_iyi_dogru_serisi),
      toplam_oyun: ham ? sayi(ham.toplam_oyun) : birlesik.gecmis.length,
      toplam_dogru: ham ? sayi(ham.toplam_dogru) : birlesik.gecmis.reduce((t, g) => t + sayi(g && g.dogru_sayisi), 0),
      ilk_asama_dogru: ham ? sayi(ham.ilk_asama_dogru) : gecmisTurlari.filter(t => t && t.sonuc === "dogru" && t.asama === 1).length,
      mukemmel_oyun: ham ? sayi(ham.mukemmel_oyun) : birlesik.gecmis.filter(g => g && g.tur_sayisi > 0 && g.dogru_sayisi === g.tur_sayisi).length,
      rozetler: {}
    };
    if (ham && ham.rozetler && typeof ham.rozetler === "object") {
      Object.keys(ham.rozetler).forEach(id => {
        if (typeof ham.rozetler[id] === "string") basarim.rozetler[id] = ham.rozetler[id];
      });
    }
    basarim.en_iyi_dogru_serisi = Math.max(basarim.en_iyi_dogru_serisi, basarim.dogru_serisi);
    basarim.en_uzun_giris = Math.max(basarim.en_uzun_giris, basarim.giris_serisi);
    birlesik.basarim = basarim;

    // Eski "Acı Tatlı" kaydını otomatik "Alternatif"e dönüştür
    if (Array.isArray(birlesik.ayarlar.turler)) {
      birlesik.ayarlar.turler = birlesik.ayarlar.turler.map(t => t === "Acı Tatlı" ? "Alternatif" : t);
    }
    const gecerliListe = KATEGORILER[birlesik.ayarlar.dil];
    birlesik.ayarlar.turler = (birlesik.ayarlar.turler || []).filter(t => gecerliListe.includes(t));
    if (birlesik.ayarlar.turler.length === 0) {
      birlesik.ayarlar.turler = [...gecerliListe];
    }
    return birlesik;
  }

  function durumuUygula(yeni) {
    Object.keys(appState).forEach(k => delete appState[k]);
    Object.assign(appState, yeni);
  }

  function veriyiYukle() {
    try {
      const kayitli = safeGetStorage(STORAGE_KEY) || safeGetStorage(ESKI_STORAGE_KEY);
      if (!kayitli) return;
      const temiz = durumuTemizle(JSON.parse(kayitli));
      if (temiz) durumuUygula(temiz);
    } catch (e) {}
  }

  function veriyiKaydet() {
    try {
      safeSetStorage(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {}
  }

  // ----- Yedekleme: tüm appState tek bir kodda (Base64 + önek) -----
  function veriyiDisaAktar() {
    const json = JSON.stringify(appState);
    const bytes = new TextEncoder().encode(json);
    let bin = "";
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    return YEDEK_ONEKI + btoa(bin);
  }

  /* Başarılıysa { ok: true }, değilse { ok: false, hata } döner. Yedek kodu geçerliyse mevcut durumun üzerine yazar. */
  function veriyiIceAktar(kod) {
    try {
      const metin = String(kod || "").trim();
      if (!metin.startsWith(YEDEK_ONEKI)) return { ok: false, hata: "Bu bir İLK NOTA yedek kodu gibi görünmüyor." };
      const bin = atob(metin.slice(YEDEK_ONEKI.length).replace(/\s+/g, ""));
      const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
      const temiz = durumuTemizle(JSON.parse(new TextDecoder().decode(bytes)));
      if (!temiz) return { ok: false, hata: "Yedek kodu geçerli veri içermiyor." };
      durumuUygula(temiz);
      veriyiKaydet();
      return { ok: true };
    } catch (e) {
      return { ok: false, hata: "Yedek kodu okunamadı. Kodu eksiksiz kopyaladığından emin ol." };
    }
  }

  App.appState = appState;
  App.adimSnDuzelt = adimSnDuzelt;
  App.veriyiYukle = veriyiYukle;
  App.veriyiKaydet = veriyiKaydet;
  App.veriyiDisaAktar = veriyiDisaAktar;
  App.veriyiIceAktar = veriyiIceAktar;
})(window.IlkNota = window.IlkNota || {});


/* ---- js/text-match.js ---- */
/* Metin normalizasyonu ve Levenshtein toleransı ile şarkı adı eşleştirme */
(function (App) {
  'use strict';

  function normalizeEt(metin) {
    if (!metin || typeof metin !== "string") return "";
    let s = metin.trim().toLocaleLowerCase("tr-TR");
    s = s.replace(/ç/g, "c")
         .replace(/ğ/g, "g")
         .replace(/ı/g, "i")
         .replace(/i̇/g, "i")
         .replace(/ö/g, "o")
         .replace(/ş/g, "s")
         .replace(/ü/g, "u")
         .replace(/â/g, "a")
         .replace(/î/g, "i")
         .replace(/û/g, "u");
    s = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, "");
    s = s.replace(/\s+/g, " ");
    return s.trim();
  }

  function levenshteinMesafesi(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[m][n];
  }

  function eslesiyorMuToleransli(girilenNorm, hedefNorm) {
    if (!girilenNorm || !hedefNorm) return false;
    if (girilenNorm === hedefNorm) return true;
    const len = hedefNorm.length;
    if (len <= 4) return false;
    const izinVerilenHata = len <= 8 ? 1 : 2;
    if (Math.abs(girilenNorm.length - len) > izinVerilenHata) return false;
    return levenshteinMesafesi(girilenNorm, hedefNorm) <= izinVerilenHata;
  }

  function tahminDogruMu(tahmin, sarki) {
    const normTahmin = normalizeEt(tahmin);
    if (!normTahmin) return false;
    if (eslesiyorMuToleransli(normTahmin, normalizeEt(sarki.ad))) return true;
    if (Array.isArray(sarki.alternatifAdlar)) {
      for (const alt of sarki.alternatifAdlar) {
        if (eslesiyorMuToleransli(normTahmin, normalizeEt(alt))) return true;
      }
    }
    return false;
  }

  /* Yazılan metin çalan şarkının sanatçısı mı? (aynı hata toleransı) */
  function sanatciDogruMu(tahmin, sarki) {
    const normTahmin = normalizeEt(tahmin);
    if (!normTahmin) return false;
    return eslesiyorMuToleransli(normTahmin, normalizeEt(sarki.sanatci));
  }

  App.sanatciDogruMu = sanatciDogruMu;
  App.normalizeEt = normalizeEt;
  App.tahminDogruMu = tahminDogruMu;
})(window.IlkNota = window.IlkNota || {});


/* ---- js/utils.js ---- */
/* Puanlama ve genel yardımcı fonksiyonlar */
(function (App) {
  'use strict';

  const { PUAN_AYARLARI } = App;

  function puanHesapla(asama, adimSn, sarkiSuresiSn, dogruMu) {
    if (!dogruMu) return 0;
    const dinlenen_sn = Math.min(sarkiSuresiSn, asama * adimSn);
    const yuzde = dinlenen_sn / sarkiSuresiSn;
    const carpan = PUAN_AYARLARI.asamaCarpani[asama - 1] ?? 0.3;
    const hamPuan = PUAN_AYARLARI.tamPuan * (1 - yuzde) * carpan * keskinKulakCarpani(adimSn);
    return Math.max(PUAN_AYARLARI.minPuan, Math.round(hamPuan));
  }

  /* "Keskin Kulak Çarpanı": 1 sn'den kısa adım sürelerinde standart 1000 puan sınırının üzerine bonus (0.2 sn -> ×1.8) */
  function keskinKulakCarpani(adimSn) {
    return adimSn < 1 ? 1 + (1 - adimSn) : 1;
  }

  /* Ondalıklı süreleri sade göster (4 -> "4", 0.30000000000000004 -> "0.3") */
  function sureMetni(sn) {
    return String(Number(Number(sn).toFixed(1)));
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function formatTime(sn) {
    const m = Math.floor(sn / 60);
    const s = Math.floor(sn % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  /* Kullanıcıdan/depodan gelen metni innerHTML içine güvenle yerleştirmek için */
  function escapeHtml(metin) {
    return String(metin).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  App.puanHesapla = puanHesapla;
  App.keskinKulakCarpani = keskinKulakCarpani;
  App.sureMetni = sureMetni;
  App.shuffleArray = shuffleArray;
  App.formatTime = formatTime;
  App.escapeHtml = escapeHtml;
})(window.IlkNota = window.IlkNota || {});


/* ---- js/ui.js ---- */
/* Ortak arayüz yardımcıları: geri bildirim mesajı, equalizer, onay penceresi */
(function (App) {
  'use strict';

  function updateEqualizerUI(playing) {
    const eq = document.getElementById("game-equalizer");
    if (eq) eq.classList.toggle("playing", !!playing);
  }

  function showFeedback(text, isDanger) {
    const msg = document.getElementById("game-feedback-msg");
    msg.textContent = text;
    msg.style.display = "flex";
    msg.style.background = isDanger ? "rgba(255, 100, 100, 0.12)" : "rgba(79, 208, 138, 0.12)";
    msg.style.color = isDanger ? "var(--bad)" : "var(--ok)";
    msg.style.borderColor = isDanger ? "var(--bad)" : "var(--ok)";
  }

  function hideFeedback() {
    document.getElementById("game-feedback-msg").style.display = "none";
  }

  function onayIste(mesaj, onEvet, onVazgec) {
    const ov = document.getElementById("confirm-modal");
    document.getElementById("confirm-text").textContent = mesaj;
    ov.classList.add("active");
    const evet = document.getElementById("confirm-yes");
    const hayir = document.getElementById("confirm-no");
    const kapat = () => {
      ov.classList.remove("active");
      evet.onclick = null;
      hayir.onclick = null;
    };
    evet.onclick = () => { kapat(); onEvet(); };
    hayir.onclick = () => { kapat(); if (onVazgec) onVazgec(); };
  }

  App.ui = { updateEqualizerUI, showFeedback, hideFeedback, onayIste };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/tooltip.js ---- */
/* Bilgi balonu (tooltip): masaüstünde hover/odak, dokunmatikte tıkla-aç / dışarı dokun-kapat */
(function (App) {
  'use strict';

  const box = document.createElement("div");
  box.className = "tooltip-box";
  box.setAttribute("role", "tooltip");
  box.id = "tooltip-box";
  document.body.appendChild(box);

  let aktifBtn = null;

  function konumla(btn) {
    const r = btn.getBoundingClientRect();
    const boxW = box.offsetWidth;
    const boxH = box.offsetHeight;
    const kenar = 12;

    let left = r.left + r.width / 2 - boxW / 2;
    left = Math.max(kenar, Math.min(left, window.innerWidth - boxW - kenar));

    // Altına sığmıyorsa üstüne koy
    let top = r.bottom + 8;
    if (top + boxH > window.innerHeight - kenar) top = Math.max(kenar, r.top - boxH - 8);

    box.style.left = `${left}px`;
    box.style.top = `${top}px`;
  }

  function goster(btn) {
    if (aktifBtn && aktifBtn !== btn) aktifBtn.classList.remove("open");
    aktifBtn = btn;
    btn.classList.add("open");
    btn.setAttribute("aria-describedby", box.id);
    box.textContent = btn.getAttribute("data-tip") || "";
    konumla(btn);
    box.classList.add("visible");
  }

  function gizle() {
    if (aktifBtn) {
      aktifBtn.classList.remove("open");
      aktifBtn.removeAttribute("aria-describedby");
    }
    aktifBtn = null;
    box.classList.remove("visible");
  }

  function infoBtn(hedef) {
    return hedef && hedef.closest ? hedef.closest(".info-btn") : null;
  }

  // Dokunma/tıklama: aç-kapa
  document.addEventListener("click", (e) => {
    const btn = infoBtn(e.target);
    if (btn) {
      e.preventDefault();
      const hoverVar = window.matchMedia("(hover: hover)").matches;
      // Fare olan cihazlarda balon zaten hover ile açıktır; dokunmatikte aç-kapa yap
      if (!hoverVar && aktifBtn === btn && box.classList.contains("visible")) gizle();
      else goster(btn);
      return;
    }
    gizle();
  });

  // Masaüstü: fare üzerine gelince / klavye odağında
  document.addEventListener("mouseover", (e) => {
    const btn = infoBtn(e.target);
    if (btn && window.matchMedia("(hover: hover)").matches) goster(btn);
  });
  document.addEventListener("mouseout", (e) => {
    const btn = infoBtn(e.target);
    if (btn && window.matchMedia("(hover: hover)").matches && !btn.contains(e.relatedTarget)) gizle();
  });
  document.addEventListener("focusin", (e) => {
    const btn = infoBtn(e.target);
    // Yalnızca klavye odağında aç; dokunma/tıklama kendi click akışını kullanır
    if (btn && btn.matches(":focus-visible")) goster(btn);
  });
  document.addEventListener("focusout", (e) => {
    if (infoBtn(e.target)) gizle();
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") gizle(); });
  window.addEventListener("scroll", gizle, true);
  window.addEventListener("resize", gizle);

  App.tooltip = { gizle };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/audio-engine.js ---- */
/* iOS uyumlu tekil ses motoru ve çok aşamalı iTunes önizleme araması */
(function (App) {
  'use strict';

  const { appState, normalizeEt, ui } = App;
  const globalAudio = document.getElementById("global-audio-player");

  // 0,1 sn'lik sessiz WAV (8 kHz, 8 bit, mono) (iOS ses kilidini açmak için)
  const SESSIZ_WAV = "data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==";

  const SesMotoru = {
    blobAdresleri: {},
    caliyorMu: false,
    baslangicSarkiSn: 0,
    hedefBitisSn: 0,
    bitisZamanlayici: null,
    onBittiCallback: null,
    aktifUrl: "",
    iosKilidiAcildi: false,
    calId: 0,             // Her durdurma/yeni çalmada artar; eski asenkron işlemleri geçersiz kılar
    onCalmaBasladi: null, // Oyun ekranı ilerleme çubuğunu bağlamak için

    // iOS, kaynağı olmayan bir <audio> öğesini "kilitli" bırakır; bu yüzden önce çok kısa sessiz bir kayıt çalınır.
    // Kullanıcı dokunuşu içinde çağrılmalıdır. Bir kez açılan öğe sonradan koddan çalınabilir.
    iosSesKilidiniAc() {
      if (this.iosKilidiAcildi || !globalAudio || this.caliyorMu) return;
      try {
        globalAudio.muted = true;
        globalAudio.src = SESSIZ_WAV;
        this.aktifUrl = "";
        const p = globalAudio.play();
        const geriAl = () => { globalAudio.muted = !!appState.ayarlar.sessiz; };
        if (p !== undefined) {
          p.then(() => {
            // Bu arada gerçek bir şarkı başladıysa ona dokunma
            if (globalAudio.src === SESSIZ_WAV) globalAudio.pause();
            geriAl();
            this.iosKilidiAcildi = true;
          }).catch(geriAl);
        }
      } catch (e) {}
    },

    // Önizleme adresi doğrudan çalmazsa (iOS, "audio/x-m4p" gibi alışılmadık tipi reddedebilir)
    // dosyayı indirip doğru tipte (audio/mp4) yerel bir adres olarak veririz
    async sesiBlobOlarakYukle(url) {
      if (this.blobAdresleri[url]) return this.blobAdresleri[url];
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 20000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        if (!res.ok) return "";
        const ham = await res.blob();
        const blobUrl = URL.createObjectURL(new Blob([ham], { type: "audio/mp4" }));
        this.blobAdresleri[url] = blobUrl;
        return blobUrl;
      } catch (e) {
        return "";
      }
    },

    setSessiz(sessiz) {
      if (globalAudio) {
        globalAudio.muted = !!sessiz;
        globalAudio.volume = sessiz ? 0 : 1;
      }
    },

    itunesJsonpAra(sorguMetni, ulke, timeoutMs = 6000) {
      return new Promise((resolve) => {
        const cbName = "itunes_cb_" + Math.random().toString(36).substring(2, 10);
        const script = document.createElement("script");
        const timer = setTimeout(() => {
          temizle();
          resolve(null);
        }, timeoutMs);

        function temizle() {
          clearTimeout(timer);
          try { delete window[cbName]; } catch (e) { window[cbName] = undefined; }
          if (script.parentNode) script.parentNode.removeChild(script);
        }

        window[cbName] = (data) => {
          temizle();
          resolve(data);
        };

        script.onerror = () => {
          temizle();
          resolve(null);
        };

        const encoded = encodeURIComponent(sorguMetni);
        script.src = `https://itunes.apple.com/search?term=${encoded}&country=${ulke}&media=music&entity=song&limit=10&callback=${cbName}`;
        document.head.appendChild(script);
      });
    },

    async tekSorguDene(sorguMetni, ulke) {
      const encoded = encodeURIComponent(sorguMetni);
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(`https://itunes.apple.com/search?term=${encoded}&country=${ulke}&media=music&entity=song&limit=10`, { signal: controller.signal });
        clearTimeout(id);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.results) && data.results.length > 0) return data.results;
        }
      } catch (e) {}

      const jsonpData = await this.itunesJsonpAra(sorguMetni, ulke, 6000);
      if (jsonpData && Array.isArray(jsonpData.results) && jsonpData.results.length > 0) {
        return jsonpData.results;
      }
      return null;
    },

    enIyiKaydiSec(sonuclar, sarki) {
      if (!Array.isArray(sonuclar) || sonuclar.length === 0) return "";
      const normHedefAd = normalizeEt(sarki.ad);
      const normHedefSanatci = normalizeEt(sarki.sanatci);

      const tamEslesen = sonuclar.find(r => {
        if (!r.previewUrl) return false;
        const rTrack = normalizeEt(r.trackName || "");
        const rArtist = normalizeEt(r.artistName || "");
        if (!rTrack || !rArtist) return false;
        return (rTrack.includes(normHedefAd) || normHedefAd.includes(rTrack)) &&
               (rArtist.includes(normHedefSanatci) || normHedefSanatci.includes(rArtist));
      });
      if (tamEslesen) return tamEslesen.previewUrl;

      const sarkiEslesen = sonuclar.find(r => r.previewUrl && normalizeEt(r.trackName || "").includes(normHedefAd));
      if (sarkiEslesen) return sarkiEslesen.previewUrl;

      const ilkGecerli = sonuclar.find(r => r.previewUrl);
      return ilkGecerli ? ilkGecerli.previewUrl : "";
    },

    async itunesSesBul(sarki) {
      if (sarki.ses_url && sarki.ses_url.trim() !== "") return sarki.ses_url;
      if (sarki._yukleniyorPromise) return sarki._yukleniyorPromise;

      sarki._yukleniyorPromise = (async () => {
        const ulke = sarki.dil === "tr" ? "TR" : "US";
        const tamSorgu = `${sarki.sanatci} ${sarki.ad}`;
        const asciiSorgu = `${normalizeEt(sarki.sanatci)} ${normalizeEt(sarki.ad)}`;

        const denemeler = [
          { q: tamSorgu, c: ulke },
          { q: asciiSorgu, c: ulke },
          { q: tamSorgu, c: ulke === "TR" ? "US" : "TR" },
          { q: sarki.ad, c: ulke }
        ];

        for (const d of denemeler) {
          const results = await this.tekSorguDene(d.q, d.c);
          const url = this.enIyiKaydiSec(results, sarki);
          if (url) {
            sarki.ses_url = url;
            sarki._yukleniyorPromise = null;
            return url;
          }
        }

        sarki._yukleniyorPromise = null;
        return "";
      })();

      return sarki._yukleniyorPromise;
    },

    async akilliOnYukleme(sarkiListesi, onProgress) {
      const oncelikli = sarkiListesi.slice(0, 2);
      const arkaPlan = sarkiListesi.slice(2);
      let tamam = 0;

      const oncelikPromise = Promise.all(
        oncelikli.map(async (s) => {
          await this.itunesSesBul(s);
          tamam++;
          if (onProgress) onProgress(tamam, oncelikli.length);
        })
      );

      const timeoutPromise = new Promise(r => setTimeout(r, 7000));
      await Promise.race([oncelikPromise, timeoutPromise]);

      (async () => {
        for (const s of arkaPlan) {
          await this.itunesSesBul(s);
        }
      })();
    },

    durdur() {
      this.calId++;

      if (this.bitisZamanlayici) {
        clearTimeout(this.bitisZamanlayici);
        this.bitisZamanlayici = null;
      }

      if (globalAudio) {
        try {
          globalAudio.pause();
          globalAudio.ontimeupdate = null;
          globalAudio.onended = null;
          globalAudio.onplaying = null;
          globalAudio.onerror = null;
        } catch (e) {}
      }

      this.caliyorMu = false;
      ui.updateEqualizerUI(false);
    },

    gecenSure() {
      if (!this.caliyorMu || !globalAudio) return this.baslangicSarkiSn;
      return Math.min(this.hedefBitisSn, globalAudio.currentTime || 0);
    },

    cal(sarki, baslangicSn, bitisSn, onBitti, onHata) {
      this.durdur();
      const benimId = this.calId;
      this.baslangicSarkiSn = baslangicSn;
      this.hedefBitisSn = Math.min(sarki.sure_sn || 30, bitisSn);
      const calinacakSure = this.hedefBitisSn - this.baslangicSarkiSn;

      if (calinacakSure <= 0) {
        if (onBitti) onBitti();
        return;
      }

      this.onBittiCallback = onBitti;

      const tamamla = () => {
        this.durdur();
        if (this.onBittiCallback) {
          const cb = this.onBittiCallback;
          this.onBittiCallback = null;
          cb();
        }
      };

      let blobDenendi = false;

      const baslatTekilAudio = (url) => {
        try {
          globalAudio.muted = !!appState.ayarlar.sessiz;
          globalAudio.volume = appState.ayarlar.sessiz ? 0 : 1;

          if (this.aktifUrl !== url) {
            globalAudio.src = url;
            this.aktifUrl = url;
            globalAudio.load();
          } else {
            try { globalAudio.currentTime = baslangicSn; } catch (e) {}
          }

          this.caliyorMu = true;
          if (this.onCalmaBasladi) this.onCalmaBasladi();

          globalAudio.onloadedmetadata = () => {
            if (baslangicSn > 0) {
              try { globalAudio.currentTime = baslangicSn; } catch (e) {}
            }
          };

          globalAudio.onplaying = () => {
            this.iosKilidiAcildi = true;
            ui.updateEqualizerUI(true);
            if (this.bitisZamanlayici) clearTimeout(this.bitisZamanlayici);
            // Kısa (<1 sn) süreler milisaniye hassasiyetinde kesilsin; ek tolerans yalnızca uzun sürelerde
            this.bitisZamanlayici = setTimeout(tamamla, calinacakSure * 1000 + (calinacakSure < 1 ? 0 : 200));

            // Kare kare izleme: timeupdate (~250 ms) yerine ekran yenileme hassasiyetiyle kes
            const izle = () => {
              if (benimId !== this.calId || !this.caliyorMu) return;
              if (globalAudio.currentTime >= this.hedefBitisSn) { tamamla(); return; }
              requestAnimationFrame(izle);
            };
            requestAnimationFrame(izle);
          };

          globalAudio.ontimeupdate = () => {
            if (this.caliyorMu && globalAudio.currentTime >= this.hedefBitisSn) {
              tamamla();
            }
          };

          globalAudio.onended = tamamla;

          // Doğrudan adres çalmadıysa bir kez, doğru tipte yerel kopyayla dene
          const blobIleDene = () => {
            blobDenendi = true;
            this.sesiBlobOlarakYukle(url).then((blobUrl) => {
              if (benimId !== this.calId) return;
              if (blobUrl) {
                baslatTekilAudio(blobUrl);
              } else {
                nihaiHata();
              }
            });
          };

          const nihaiHata = () => {
            this.durdur();
            sarki.ses_url = "";
            this.aktifUrl = "";
            if (onHata) onHata("Ses akışı yenileniyor, lütfen tekrar 'Turu Başlat' düğmesine dokunun.");
          };

          globalAudio.onerror = () => {
            if (benimId !== this.calId) return;
            if (!blobDenendi) blobIleDene();
            else nihaiHata();
          };

          const playPromise = globalAudio.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              // Bu çalma isteği bu arada iptal edildiyse (yeni tur/yeni çalma) yeni oturuma dokunma
              if (benimId !== this.calId) return;
              // Biçim / kaynak sorunu: yerel kopyayla bir kez daha dene (dokunuş izni sorunu değil)
              if (err && err.name === "NotSupportedError" && !blobDenendi) { blobIleDene(); return; }
              this.durdur();
              if (onHata) onHata("Ses hazır! Dinlemek için tekrar '▶ Turu Başlat' düğmesine dokunun.");
            });
          }
        } catch (e) {
          this.durdur();
          if (onHata) onHata("Ses oynatıcı başlatılamadı.");
        }
      };

      if (sarki.ses_url && sarki.ses_url.trim() !== "") {
        baslatTekilAudio(sarki.ses_url);
      } else {
        ui.showFeedback("Şarkı ses akışı bağlanıyor, lütfen 1 saniye bekleyin...", false);
        this.itunesSesBul(sarki).then((url) => {
          // Beklerken kullanıcı başka ekrana geçtiyse / tekrar bastıysa bu çağrıyı yok say
          if (benimId !== this.calId) return;
          ui.hideFeedback();
          if (url) {
            baslatTekilAudio(url);
          } else {
            this.durdur();
            if (onHata) onHata("Bu şarkının ses kaydına ulaşılamadı. Tekrar deneyebilir veya cevabı görebilirsiniz.");
          }
        });
      }
    }
  };

  App.SesMotoru = SesMotoru;
})(window.IlkNota = window.IlkNota || {});


/* ---- js/router.js ---- */
/* Ekran yönetimi ve hash tabanlı yönlendirme */
(function (App) {
  'use strict';

  const { SesMotoru, ui } = App;

  const screens = {
    menu: document.getElementById("screen-menu"),
    how: document.getElementById("screen-how"),
    settings: document.getElementById("screen-settings"),
    loading: document.getElementById("screen-loading"),
    game: document.getElementById("screen-game"),
    roundResult: document.getElementById("screen-round-result"),
    gameOver: document.getElementById("screen-game-over"),
    stats: document.getElementById("screen-stats"),
    collection: document.getElementById("screen-collection"),
    profile: document.getElementById("screen-profile"),
    achievements: document.getElementById("screen-achievements")
  };

  const ROUTE_EKRAN = {
    "menu": "menu", "nasil-oynanir": "how", "ayarlar": "settings",
    "oyun": "game", "tur-sonu": "roundResult", "ozet": "gameOver",
    "istatistikler": "stats", "koleksiyon": "collection", "profil": "profile",
    "basarimlar": "achievements"
  };

  // Bu rotalara yalnızca oyun akışı içeriden gelebilir; adres çubuğundan / geri-ileri ile girilemez
  const OYUN_ROTALARI = ["oyun", "tur-sonu", "ozet"];

  // Ekran açılırken yeniden çizilmesi gereken ekranlar (ilgili modüller kaydeder)
  const renderers = {};

  let currentScreenName = "menu";
  let currentRoute = "menu";

  function showScreen(name) {
    SesMotoru.durdur();
    currentScreenName = name;
    Object.keys(screens).forEach(k => {
      if (screens[k]) screens[k].classList.remove("active");
    });
    if (screens[name]) screens[name].classList.add("active");
    window.scrollTo(0, 0);

    if (renderers[name]) renderers[name]();
  }

  function handleRoute(route) {
    let ekran = ROUTE_EKRAN[route] ? route : "menu";
    // İlk girişte rehber tamamlanana kadar menü ve "Nasıl Oynanır" dışındaki tüm ekranlar kilitlidir
    if (App.tutorialKilitliMi && App.tutorialKilitliMi() && ekran !== "menu" && ekran !== "nasil-oynanir") {
      ekran = "menu";
      hashiGeriYukle(ekran);
    }
    currentRoute = ekran;
    showScreen(ROUTE_EKRAN[ekran]);
  }

  function hashiGeriYukle(rota) {
    try {
      history.replaceState(null, "", "#/" + (rota || currentRoute));
    } catch (e) {}
  }

  function navigate(route, korumali) {
    // Devam eden oyunda (tur ekranı ve tur sonu / cevap kartı) çıkış onay ister
    const oyunIcinde = currentScreenName === "game" || currentScreenName === "roundResult";
    if (korumali && oyunIcinde && !OYUN_ROTALARI.includes(route)) {
      onayBekliyor = true;
      ui.onayIste(
        "Devam eden oyundan çıkmak istiyor musunuz?",
        () => { onayBekliyor = false; navigate(route, false); },
        () => { onayBekliyor = false; hashiGeriYukle(); }
      );
      return;
    }
    handleRoute(route);
    try {
      if (location.hash !== "#/" + currentRoute) location.hash = "#/" + currentRoute;
    } catch (e) {}
  }

  let onayBekliyor = false;

  window.addEventListener("hashchange", () => {
    const route = location.hash.replace("#/", "") || "menu";
    if (route === currentRoute) return;
    if (onayBekliyor) return;
    if (OYUN_ROTALARI.includes(route)) {
      hashiGeriYukle();
      return;
    }
    navigate(route, true);
  });

  App.router = {
    navigate,
    handleRoute,
    showScreen,
    renderers,
    getCurrentScreen: () => currentScreenName
  };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/header.js ---- */
/* Üst çubuk: ana sayfa, yardım ve sessize alma düğmeleri */
(function (App) {
  'use strict';

  const { appState, veriyiKaydet, SesMotoru, router } = App;

  const muteBtn = document.getElementById("mute-toggle-btn");

  function guncelleMuteUI() {
    muteBtn.innerHTML = App.icon(appState.ayarlar.sessiz ? "sessiz" : "ses", 22);
    muteBtn.setAttribute("title", appState.ayarlar.sessiz ? "Sesi Aç" : "Sessize Al");
  }

  const markaBtn = document.getElementById("brand-home-btn");
  markaBtn.addEventListener("click", () => router.navigate("menu", true));
  markaBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.navigate("menu", true); }
  });
  document.getElementById("help-btn").addEventListener("click", () => router.navigate("nasil-oynanir", true));

  muteBtn.addEventListener("click", () => {
    appState.ayarlar.sessiz = !appState.ayarlar.sessiz;
    veriyiKaydet();
    guncelleMuteUI();
    SesMotoru.setSessiz(appState.ayarlar.sessiz);
  });

  document.querySelectorAll(".back-to-menu-btn").forEach(btn => {
    btn.addEventListener("click", () => router.navigate("menu"));
  });

  App.guncelleMuteUI = guncelleMuteUI;
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/menu.js ---- */
/* Ana menü ekranı ve "Nasıl Oynanır" ekranı */
(function (App) {
  'use strict';

  const { appState, SesMotoru, router, veriyiKaydet } = App;

  // ----- İlk giriş rehberi: "Nasıl Oynanır?" ekranı görülene kadar Oyna ve İstatistik kilitli -----
  function tutorialKilitliMi() {
    const eskiOyuncu = (appState.gecmis || []).length > 0 || (appState.en_yuksek_puan || 0) > 0;
    return !appState.tutorial_tamamlandi && !eskiOyuncu;
  }

  function tutorialArayuzunuUygula() {
    const kilitli = tutorialKilitliMi();
    document.getElementById("menu-play-btn").disabled = kilitli;
    document.getElementById("menu-stats-btn").disabled = kilitli;
    document.getElementById("tutorial-arrow").style.display = kilitli ? "flex" : "none";
    document.getElementById("menu-how-btn").classList.toggle("tutorial-highlight", kilitli);
    // Rehber açıkken yalnızca "Nasıl Oynanır?" parlak kalır; geri kalan her şey soluk, bulanık ve tıklanamaz
    document.body.classList.toggle("tutorial-aktif", kilitli);
  }

  function tutorialiTamamla() {
    document.body.classList.remove("tutorial-aktif");
    if (appState.tutorial_tamamlandi) return;
    appState.tutorial_tamamlandi = true;
    veriyiKaydet();
  }

  App.tutorialKilitliMi = tutorialKilitliMi;

  function renderMenu() {
    tutorialArayuzunuUygula();
    const hs = appState.en_yuksek_puan || 0;
    document.getElementById("menu-high-score").textContent = hs;
    const desc = document.getElementById("menu-high-score-desc");
    if (hs > 0) {
      const lastGame = appState.gecmis[0];
      desc.textContent = lastGame ? `Son oyun: ${lastGame.toplam_puan} puan` : "En iyi skorun";
    } else {
      desc.textContent = "Henüz oyun oynamadın";
    }
  }

  router.renderers.menu = renderMenu;
  // "Nasıl Oynanır?" ekranı açıldığı anda kilitler kalıcı olarak açılır
  router.renderers.how = tutorialiTamamla;

  document.getElementById("menu-play-btn").addEventListener("click", () => {
    SesMotoru.iosSesKilidiniAc();
    router.navigate("ayarlar");
  });
  document.getElementById("menu-how-btn").addEventListener("click", () => router.navigate("nasil-oynanir"));
  document.getElementById("menu-stats-btn").addEventListener("click", () => router.navigate("istatistikler"));

  // Nasıl Oynanır: puan formülü penceresi
  const scoreModal = document.getElementById("score-modal");
  document.getElementById("show-score-formula-btn").addEventListener("click", () => scoreModal.classList.add("active"));
  document.getElementById("close-score-modal").addEventListener("click", () => scoreModal.classList.remove("active"));
  scoreModal.addEventListener("click", (e) => {
    if (e.target === scoreModal) scoreModal.classList.remove("active");
  });
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/settings.js ---- */
/* Oyun ayarları ekranı */
(function (App) {
  'use strict';

  const { appState, KATEGORILER, veriyiKaydet, getUygunSarkilar, router } = App;

  function renderSettings() {
    const ayarlar = appState.ayarlar;
    const aktifDil = ayarlar.dil || "tr";
    const dilKategorileri = KATEGORILER[aktifDil];

    document.querySelectorAll("#lang-control .lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === aktifDil);
    });

    const chipContainer = document.getElementById("genre-chips");
    chipContainer.innerHTML = "";

    const hepsiChip = document.createElement("div");
    hepsiChip.className = "chip-option" + (ayarlar.turler.length === dilKategorileri.length ? " active" : "");
    hepsiChip.setAttribute("data-genre", "ALL");
    hepsiChip.textContent = "Hepsi";
    chipContainer.appendChild(hepsiChip);

    dilKategorileri.forEach(tur => {
      const chip = document.createElement("div");
      chip.className = "chip-option" + (ayarlar.turler.includes(tur) ? " active" : "");
      chip.setAttribute("data-genre", tur);
      chip.textContent = tur;
      chipContainer.appendChild(chip);
    });

    // Adım süresi: hazır değerler veya "Özel" (0.1 sn hassasiyetli)
    const hazirMi = ["2", "4", "7", "10"].includes(String(ayarlar.adim_sn));
    const ozelAktif = !!ayarlar.adim_ozel || !hazirMi;
    document.querySelectorAll("#step-control .segment-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.val === "ozel"
        ? ozelAktif
        : !ozelAktif && parseFloat(btn.dataset.val) === ayarlar.adim_sn);
    });
    document.getElementById("custom-step-wrap").style.display = ozelAktif ? "flex" : "none";
    const ozelInput = document.getElementById("custom-step-input");
    if (document.activeElement !== ozelInput) ozelInput.value = ayarlar.adim_sn;

    document.querySelectorAll("#rounds-control .segment-btn").forEach(btn => {
      btn.classList.toggle("active", parseInt(btn.dataset.val, 10) === ayarlar.tur_sayisi);
    });

    document.querySelectorAll("#mode-control .segment-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.val === (ayarlar.mod || "klasik"));
    });

    guncelleSettingsOzet();
  }

  function guncelleSettingsOzet() {
    const ayarlar = appState.ayarlar;
    const maxDinleme = App.sureMetni(3 * ayarlar.adim_sn);
    const keskin = ayarlar.adim_sn < 1 ? ` Keskin Kulak çarpanı: ×${App.sureMetni(App.keskinKulakCarpani(ayarlar.adim_sn))}` : "";
    document.getElementById("settings-summary-listen").textContent = `Bu ayarlarla en fazla ${maxDinleme} sn dinleyeceksin.${keskin}`;

    const uygunlar = getUygunSarkilar(ayarlar.dil, ayarlar.turler, ayarlar.adim_sn);
    const uygunSayi = uygunlar.length;
    document.getElementById("settings-summary-songs").textContent = `Uygun şarkı sayısı: ${uygunSayi}`;

    const warnEl = document.getElementById("settings-warning");
    const startBtn = document.getElementById("start-game-btn");

    if (uygunSayi === 0) {
      startBtn.disabled = true;
      warnEl.style.display = "block";
      warnEl.textContent = "Bu ayarlara uygun şarkı bulunamadı.";
    } else {
      if (ayarlar.tur_sayisi > uygunSayi) {
        warnEl.style.display = "block";
        warnEl.textContent = `Seçili kategorilerde ${uygunSayi} şarkı var, oyun ${uygunSayi} tur üzerinden oynanacak.`;
      } else {
        warnEl.style.display = "none";
      }
      startBtn.disabled = false;
    }
  }

  router.renderers.settings = renderSettings;

  document.getElementById("lang-control").addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    const yeniDil = btn.dataset.lang;
    if (yeniDil === appState.ayarlar.dil) return;

    appState.ayarlar.dil = yeniDil;
    appState.ayarlar.turler = [...KATEGORILER[yeniDil]];
    veriyiKaydet();
    renderSettings();
  });

  document.getElementById("genre-chips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip-option");
    if (!chip) return;
    const g = chip.getAttribute("data-genre");
    const allGenres = KATEGORILER[appState.ayarlar.dil];

    if (g === "ALL") {
      if (appState.ayarlar.turler.length === allGenres.length) {
        appState.ayarlar.turler = [allGenres[0]];
      } else {
        appState.ayarlar.turler = [...allGenres];
      }
    } else {
      const idx = appState.ayarlar.turler.indexOf(g);
      if (idx >= 0) {
        if (appState.ayarlar.turler.length > 1) {
          appState.ayarlar.turler.splice(idx, 1);
        }
      } else {
        appState.ayarlar.turler.push(g);
      }
    }
    veriyiKaydet();
    renderSettings();
  });

  document.getElementById("step-control").addEventListener("click", (e) => {
    const btn = e.target.closest(".segment-btn");
    if (!btn) return;
    if (btn.dataset.val === "ozel") {
      appState.ayarlar.adim_ozel = true;
    } else {
      appState.ayarlar.adim_ozel = false;
      appState.ayarlar.adim_sn = parseInt(btn.dataset.val, 10);
    }
    veriyiKaydet();
    renderSettings();
  });

  // Özel süre: yazarken anlık güncelle (geçerliyse), alandan çıkınca değeri düzelt
  const ozelInput = document.getElementById("custom-step-input");
  ozelInput.addEventListener("input", () => {
    const deger = App.adimSnDuzelt(ozelInput.value);
    if (ozelInput.value === "" || deger === null) return;
    appState.ayarlar.adim_sn = deger;
    appState.ayarlar.adim_ozel = true;
    veriyiKaydet();
    guncelleSettingsOzet();
  });
  // − / + düğmeleri: 0.1 sn'lik adımlar (basılı tutunca tekrarlar)
  function ozelSureAdimla(yon) {
    const simdi = App.adimSnDuzelt(ozelInput.value);
    const yeni = App.adimSnDuzelt((simdi === null ? appState.ayarlar.adim_sn : simdi) + yon * 0.1);
    appState.ayarlar.adim_sn = yeni;
    appState.ayarlar.adim_ozel = true;
    veriyiKaydet();
    renderSettings();
    ozelInput.value = yeni; // girişe odaklıyken de görünen değer güncellensin
  }

  [["custom-step-minus", -1], ["custom-step-plus", 1]].forEach(([id, yon]) => {
    const btn = document.getElementById(id);
    let bekle = null;
    let tekrar = null;
    const durdur = () => { clearTimeout(bekle); clearInterval(tekrar); };
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      ozelSureAdimla(yon);
      bekle = setTimeout(() => { tekrar = setInterval(() => ozelSureAdimla(yon), 80); }, 450);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(ev => btn.addEventListener(ev, durdur));
    // Klavye (Enter/Boşluk) ile tetiklenen tıklama için
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ozelSureAdimla(yon); }
    });
  });

  ozelInput.addEventListener("change", () => {
    const deger = App.adimSnDuzelt(ozelInput.value);
    if (deger !== null) {
      appState.ayarlar.adim_sn = deger;
      appState.ayarlar.adim_ozel = true;
      veriyiKaydet();
    }
    renderSettings();
  });

  document.getElementById("mode-control").addEventListener("click", (e) => {
    const btn = e.target.closest(".segment-btn");
    if (!btn || !App.GECERLI_MODLAR.includes(btn.dataset.val)) return;
    appState.ayarlar.mod = btn.dataset.val;
    veriyiKaydet();
    renderSettings();
  });

  document.getElementById("rounds-control").addEventListener("click", (e) => {
    const btn = e.target.closest(".segment-btn");
    if (!btn) return;
    appState.ayarlar.tur_sayisi = parseInt(btn.dataset.val, 10);
    veriyiKaydet();
    renderSettings();
  });
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/game.js ---- */
/* Oyun başlatma ve tur ekranı (dinleme, tahmin, aşama geçişi) */
(function (App) {
  'use strict';

  const {
    appState, SesMotoru, ui, router, SARKILAR, getUygunSarkilar, shuffleArray, puanHesapla,
    tahminDogruMu, normalizeEt, PUAN_AYARLARI, IPUCU_AYARLARI, SIK_SAYISI, SANATCI_LISTE_SAYISI
  } = App;

  let aktifOyun = {
    sarkilar: [],
    turIndex: 0,
    asama: 1,
    kalanHak: 3,
    adimSn: 4,
    toplamTur: 5,
    toplamPuan: 0,
    turGecmisi: [],
    yanlisTahminler: [],
    turBasladi: false,
    mod: "klasik",
    secenekler: [],
    ipucuSayisi: 0
  };

  // Süreleri gösterirken: tam sayı adımlarda yuvarla, ondalıklı (özel) adımlarda 0.1 sn hassasiyetini koru
  function gosterSn(sn) {
    return aktifOyun.adimSn % 1 === 0 ? Math.round(sn) : App.sureMetni(sn);
  }

  // ----- Şıklı mod ve ipucu yardımcıları -----
  function turPuaniniHesapla(sarki) {
    const puan = puanHesapla(aktifOyun.asama, aktifOyun.adimSn, sarki.sure_sn, true);
    const oran = Math.min(1, aktifOyun.ipucuSayisi * IPUCU_AYARLARI.kesintiOrani);
    return Math.max(PUAN_AYARLARI.minPuan, Math.round(puan * (1 - oran)));
  }

  function secenekleriOlustur(sarki) {
    // Çeldiriciler: çalan şarkıyla aynı dil ve aynı kategoriden, farklı adlı rastgele şarkılar
    const dogruNorm = normalizeEt(sarki.ad);
    const gorulen = new Set([dogruNorm]);
    const celdiriciler = [];
    shuffleArray(SARKILAR.filter(s => s.dil === sarki.dil && s.tur === sarki.tur)).forEach(s => {
      const norm = normalizeEt(s.ad);
      if (celdiriciler.length < SIK_SAYISI - 1 && !gorulen.has(norm)) {
        gorulen.add(norm);
        celdiriciler.push(s.ad);
      }
    });
    return shuffleArray([sarki.ad, ...celdiriciler]);
  }

  function modArayuzunuGuncelle() {
    const sikli = aktifOyun.mod === "sikli";
    document.getElementById("guess-input-container").style.display = sikli ? "none" : "";
    // Sanatçı şarkı listesi her turda kapalı başlar
    aktifOyun.sanatciListesiAcik = false;
    const sanatciKutu = document.getElementById("artist-options");
    sanatciKutu.style.display = "none";
    sanatciKutu.innerHTML = "";
    const optionsEl = document.getElementById("options-container");
    optionsEl.style.display = sikli ? "flex" : "none";
    optionsEl.innerHTML = "";
    if (!sikli) return;

    aktifOyun.secenekler.forEach((ad, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.append(secenekHarfi(i), ad);
      btn.addEventListener("click", () => {
        const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
        tahminiIsle(ad, ad === sarki.ad, btn);
      });
      optionsEl.appendChild(btn);
    });
  }

  function basHarfler(isim) {
    return isim.split(/\s+/).filter(Boolean)
      .map(k => k.charAt(0).toLocaleUpperCase("tr-TR") + ".").join(" ");
  }

  // Şık düğmesinin solundaki harf rozeti (A, B, C, D)
  function secenekHarfi(i) {
    const key = document.createElement("span");
    key.className = "key";
    key.textContent = String.fromCharCode(65 + i);
    return key;
  }

  // İpucu metni: { ikon, metin } (görünüm ikon ile birlikte çizilir)
  function ipucuMetni(sarki, no) {
    if (no === 1) return { ikon: "takvim", metin: `Çıkış yılı: ${sarki.yil}` };
    if (no === 2) return { ikon: "mikrofon", metin: `Sanatçının baş harfleri: ${basHarfler(sarki.sanatci)}` };
    return {
      ikon: "plak",
      metin: normalizeEt(sarki.album) === normalizeEt(sarki.ad)
        ? "Albüm: şarkıyla aynı adı taşıyor"
        : `Albüm: ${sarki.album}`
    };
  }

  function ipucuButonunuGuncelle() {
    const btn = document.getElementById("game-hint-btn");
    const kalan = IPUCU_AYARLARI.maksimum - aktifOyun.ipucuSayisi;
    const yuzde = Math.round(IPUCU_AYARLARI.kesintiOrani * 100);
    btn.disabled = kalan <= 0;
    btn.innerHTML = App.ikonlu("ipucu", kalan <= 0
      ? "Tüm ipuçları kullanıldı"
      : `İpucu Al · −%${yuzde} · ${kalan} hak`, 18);
  }

  let progressAnimId = null;
  function startProgressLoop() {
    if (progressAnimId) cancelAnimationFrame(progressAnimId);
    function loop() {
      if (aktifOyun.sarkilar.length > 0 && aktifOyun.turIndex < aktifOyun.sarkilar.length) {
        const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
        const curTime = SesMotoru.gecenSure();
        const totalTime = sarki.sure_sn;
        const pct = Math.min(100, (curTime / totalTime) * 100);

        const playhead = document.getElementById("listen-playhead");
        if (playhead) playhead.style.left = `${pct}%`;

        const statusText = document.getElementById("listen-status-text");
        if (statusText) {
          const dinlenenPct = Math.round((curTime / totalTime) * 100);
          statusText.textContent = `Dinlenen: ${gosterSn(curTime)} sn / ${totalTime} sn (%${dinlenenPct})`;
        }
      }
      if (SesMotoru.caliyorMu) {
        progressAnimId = requestAnimationFrame(loop);
      }
    }
    progressAnimId = requestAnimationFrame(loop);
  }

  // Ses gerçekten çalmaya başladığında (ses adresi geç çözülse bile) ilerleme çubuğu çalışsın
  SesMotoru.onCalmaBasladi = startProgressLoop;

  // ----- Oyunu başlat -----
  let baslatiliyor = false;

  document.getElementById("start-game-btn").addEventListener("click", async () => {
    if (baslatiliyor) return;
    SesMotoru.iosSesKilidiniAc();
    const uygunlar = getUygunSarkilar(appState.ayarlar.dil, appState.ayarlar.turler, appState.ayarlar.adim_sn);
    if (uygunlar.length === 0) return;

    const secilenSarkilar = shuffleArray(uygunlar).slice(0, appState.ayarlar.tur_sayisi);

    aktifOyun = {
      sarkilar: secilenSarkilar,
      turIndex: 0,
      asama: 1,
      kalanHak: 3,
      adimSn: appState.ayarlar.adim_sn,
      toplamTur: secilenSarkilar.length,
      toplamPuan: 0,
      turGecmisi: [],
      yanlisTahminler: [],
      turBasladi: false,
      mod: appState.ayarlar.mod || "klasik",
      secenekler: [],
      ipucuSayisi: 0
    };
    const buOyun = aktifOyun;

    baslatiliyor = true;
    router.showScreen("loading");
    const statusEl = document.getElementById("loading-status");
    statusEl.textContent = "İlk tur için orijinal ses akışı hazırlanıyor...";

    try {
      await SesMotoru.akilliOnYukleme(secilenSarkilar, (tamamlanan, toplam) => {
        statusEl.textContent = `Şarkılar bağlanıyor (${tamamlanan}/${toplam})...`;
      });
    } finally {
      baslatiliyor = false;
    }

    // Yükleme sürerken kullanıcı başka bir ekrana geçtiyse oyunu zorla açma
    if (aktifOyun !== buOyun || router.getCurrentScreen() !== "loading") return;

    router.navigate("oyun");
    turuAyarla(0);
  });

  function turuAyarla(turIdx) {
    aktifOyun.turIndex = turIdx;
    aktifOyun.asama = 1;
    aktifOyun.kalanHak = 3;
    aktifOyun.yanlisTahminler = [];
    aktifOyun.turBasladi = false;
    aktifOyun.ipucuSayisi = 0;

    const sarki = aktifOyun.sarkilar[turIdx];
    aktifOyun.secenekler = aktifOyun.mod === "sikli" ? secenekleriOlustur(sarki) : [];
    SesMotoru.itunesSesBul(sarki);
    if (aktifOyun.sarkilar[turIdx + 1]) {
      SesMotoru.itunesSesBul(aktifOyun.sarkilar[turIdx + 1]);
    }

    document.getElementById("game-round-title").textContent = `Tur ${turIdx + 1}/${aktifOyun.toplamTur}`;
    document.getElementById("game-total-score").textContent = aktifOyun.toplamPuan;

    const dotsContainer = document.getElementById("game-progress-dots");
    dotsContainer.innerHTML = "";
    for (let i = 0; i < aktifOyun.toplamTur; i++) {
      const dot = document.createElement("div");
      dot.className = "progress-dot";
      if (i < aktifOyun.turGecmisi.length) {
        const res = aktifOyun.turGecmisi[i].sonuc;
        dot.classList.add(res === "dogru" ? "correct" : "wrong");
      } else if (i === turIdx) {
        dot.classList.add("active");
      }
      dotsContainer.appendChild(dot);
    }

    const totalTime = sarki.sure_sn;
    document.getElementById("notch-1").style.left = `${Math.min(100, (aktifOyun.adimSn / totalTime) * 100)}%`;
    document.getElementById("notch-2").style.left = `${Math.min(100, ((aktifOyun.adimSn * 2) / totalTime) * 100)}%`;
    document.getElementById("notch-3").style.left = `${Math.min(100, ((aktifOyun.adimSn * 3) / totalTime) * 100)}%`;

    document.getElementById("listen-playhead").style.left = "0%";
    document.getElementById("game-wrong-guesses").innerHTML = "";
    document.getElementById("game-hints").innerHTML = "";
    ui.hideFeedback();
    document.getElementById("guess-input").value = "";
    modArayuzunuGuncelle();

    const playBtn = document.getElementById("game-play-btn");
    playBtn.innerHTML = App.ikonlu("play", "Turu Başlat", 18);

    guncelleAsamaUI();
  }

  function guncelleDinlemeCubuGu() {
    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
    const totalTime = sarki.sure_sn;
    const unlockedSn = Math.min(totalTime, aktifOyun.asama * aktifOyun.adimSn);
    const unlockedPct = Math.min(100, (unlockedSn / totalTime) * 100);

    document.getElementById("listen-unlocked-bar").style.width = `${unlockedPct}%`;
    document.getElementById("listen-unlocked-text").textContent = `Açık: ${gosterSn(unlockedSn)} sn`;
    const curTime = SesMotoru.gecenSure();
    const dinlenenPct = Math.round((curTime / totalTime) * 100);
    document.getElementById("listen-status-text").textContent = `Dinlenen: ${gosterSn(curTime)} sn / ${totalTime} sn (%${dinlenenPct})`;
  }

  function guncelleAsamaUI() {
    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
    document.getElementById("game-stage-badge").textContent = `Aşama ${aktifOyun.asama}/3 · Kalan Hak: ${aktifOyun.kalanHak}`;

    const potPuan = turPuaniniHesapla(sarki);
    document.getElementById("game-potential-score").textContent = `Şimdi bilirsen: ${potPuan} p`;
    ipucuButonunuGuncelle();

    const passBtn = document.getElementById("game-pass-btn");
    if (aktifOyun.asama >= 3) {
      passBtn.style.display = "none";
    } else {
      passBtn.style.display = "inline-flex";
      passBtn.innerHTML = App.ikonlu("forward", `Daha fazla dinle · +${App.sureMetni(aktifOyun.adimSn)} sn`, 18);
    }

    guncelleDinlemeCubuGu();
  }

  function guncelleOynatButonu(caliyor) {
    const playBtn = document.getElementById("game-play-btn");
    if (!aktifOyun.turBasladi) {
      playBtn.innerHTML = App.ikonlu("play", "Turu Başlat", 18);
    } else {
      playBtn.innerHTML = caliyor
        ? App.ikonlu("pause", "Durdur", 18)
        : App.ikonlu("replay", "Tekrar Dinle", 18);
    }
  }

  function calmaBolumunuBaslat() {
    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
    const bitis = Math.min(sarki.sure_sn, aktifOyun.asama * aktifOyun.adimSn);
    guncelleOynatButonu(true);
    SesMotoru.cal(
      sarki,
      0,
      bitis,
      () => {
        guncelleOynatButonu(false);
      },
      (hataMesaji) => {
        guncelleOynatButonu(false);
        ui.showFeedback(hataMesaji, true);
      }
    );
    startProgressLoop();
  }

  document.getElementById("game-play-btn").addEventListener("click", () => {
    ui.hideFeedback();
    if (!aktifOyun.turBasladi) {
      aktifOyun.turBasladi = true;
      calmaBolumunuBaslat();
    } else {
      if (SesMotoru.caliyorMu) {
        SesMotoru.durdur();
        guncelleOynatButonu(false);
      } else {
        calmaBolumunuBaslat();
      }
    }
  });

  function tahminYap() {
    const input = document.getElementById("guess-input");
    const tahmin = input.value.trim();

    if (!tahmin) {
      ui.showFeedback("Lütfen bir şarkı adı yazın!", true);
      return;
    }

    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
    const sarkiDogru = tahminDogruMu(tahmin, sarki);

    // Klasik modda doğru sanatçı yazıldıysa hak düşmez; o sanatçının şarkılarından seçim listesi açılır
    if (!sarkiDogru && aktifOyun.mod !== "sikli" && App.sanatciDogruMu(tahmin, sarki)) {
      input.value = "";
      sanatciListesiniAc(sarki);
      return;
    }

    tahminiIsle(tahmin, sarkiDogru, null);
  }

  function sanatciListesiniAc(sarki) {
    const kutu = document.getElementById("artist-options");
    if (!aktifOyun.sanatciListesiAcik) {
      // Aynı sanatçının (benzersiz adlı) şarkıları; 7'den fazlaysa doğru şarkı dahil 7 tanesi
      const gorulen = new Set([normalizeEt(sarki.ad)]);
      const digerleri = [];
      shuffleArray(SARKILAR.filter(s => s.sanatci === sarki.sanatci)).forEach(s => {
        const norm = normalizeEt(s.ad);
        if (!gorulen.has(norm)) {
          gorulen.add(norm);
          digerleri.push(s.ad);
        }
      });
      const liste = shuffleArray([sarki.ad, ...digerleri.slice(0, SANATCI_LISTE_SAYISI - 1)]);

      kutu.innerHTML = "";
      liste.forEach((ad, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-btn";
        btn.append(secenekHarfi(i), ad);
        btn.addEventListener("click", () => tahminiIsle(ad, ad === sarki.ad, btn));
        kutu.appendChild(btn);
      });
      aktifOyun.sanatciListesiAcik = true;
    }
    kutu.style.display = "flex";
    ui.showFeedback("Doğru sanatçı! Hakkın düşmedi, şimdi şarkıyı listeden seç.", false);
  }

  // Klasik (yazılan tahmin) ve şıklı (seçilen şık) modların ortak değerlendirmesi
  function tahminiIsle(tahmin, dogru, secenekBtn) {
    const input = document.getElementById("guess-input");
    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];

    if (dogru) {
      SesMotoru.durdur();
      const kazanilanPuan = turPuaniniHesapla(sarki);
      aktifOyun.toplamPuan += kazanilanPuan;
      App.basarim.dogruTahmin(aktifOyun.asama === 1);
      const dinlenenSn = Math.min(sarki.sure_sn, aktifOyun.asama * aktifOyun.adimSn);
      const yuzde = Math.round((dinlenenSn / sarki.sure_sn) * 100);

      aktifOyun.turGecmisi.push({
        sarki_id: sarki.id,
        sonuc: "dogru",
        asama: aktifOyun.asama,
        puan: kazanilanPuan,
        yuzde: yuzde,
        ipucu: aktifOyun.ipucuSayisi
      });

      App.roundResult.goster(true, kazanilanPuan, aktifOyun.asama, yuzde, aktifOyun.ipucuSayisi);
    } else {
      aktifOyun.kalanHak--;
      aktifOyun.yanlisTahminler.push(tahmin);

      if (secenekBtn) {
        // Şıklı mod: yanlış şık kırmızı olur ve kapanır
        secenekBtn.classList.add("wrong");
        secenekBtn.disabled = true;
      } else {
        input.value = "";
        const chipContainer = document.getElementById("game-wrong-guesses");
        const chip = document.createElement("span");
        chip.className = "chip-wrong";
        chip.innerHTML = App.icon("x", 12);
        chip.append(tahmin);
        chipContainer.appendChild(chip);
      }

      const inputWrap = secenekBtn
        ? secenekBtn.parentElement
        : document.getElementById("guess-input-container");
      inputWrap.classList.remove("shake");
      void inputWrap.offsetWidth;
      inputWrap.classList.add("shake");

      if (aktifOyun.kalanHak <= 0) {
        SesMotoru.durdur();
        const dinlenenSn = Math.min(sarki.sure_sn, 3 * aktifOyun.adimSn);
        const yuzde = Math.round((dinlenenSn / sarki.sure_sn) * 100);

        aktifOyun.turGecmisi.push({
          sarki_id: sarki.id,
          sonuc: "yanlis",
          asama: 3,
          puan: 0,
          yuzde: yuzde
        });

        App.basarim.seriyiKir();
        App.roundResult.goster(false, 0, 3, yuzde);
      } else {
        aktifOyun.asama = Math.min(3, aktifOyun.asama + 1);
        const yeniSure = Math.min(sarki.sure_sn, aktifOyun.asama * aktifOyun.adimSn);
        ui.showFeedback(`Olmadı! ${aktifOyun.kalanHak} hakkın kaldı, ${App.sureMetni(yeniSure)} sn dinleyebilirsin.`, true);
        guncelleAsamaUI();
        aktifOyun.turBasladi = true;
        calmaBolumunuBaslat();
      }
    }
  }

  document.getElementById("guess-submit-btn").addEventListener("click", tahminYap);
  document.getElementById("guess-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      tahminYap();
    }
  });

  document.getElementById("game-pass-btn").addEventListener("click", () => {
    if (aktifOyun.asama < 3) {
      aktifOyun.kalanHak = Math.max(1, aktifOyun.kalanHak - 1);
      aktifOyun.asama++;
      ui.hideFeedback();
      guncelleAsamaUI();
      aktifOyun.turBasladi = true;
      calmaBolumunuBaslat();
    }
  });

  document.getElementById("game-hint-btn").addEventListener("click", () => {
    if (aktifOyun.ipucuSayisi >= IPUCU_AYARLARI.maksimum) return;
    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
    aktifOyun.ipucuSayisi++;

    const item = document.createElement("div");
    item.className = "hint-item";
    const ipucu = ipucuMetni(sarki, aktifOyun.ipucuSayisi);
    item.innerHTML = App.icon(ipucu.ikon, 18);
    item.append(ipucu.metin);
    document.getElementById("game-hints").appendChild(item);

    guncelleAsamaUI();
  });

  document.getElementById("game-giveup-btn").addEventListener("click", () => {
    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
    SesMotoru.durdur();
    const dinlenenSn = Math.min(sarki.sure_sn, aktifOyun.asama * aktifOyun.adimSn);
    const yuzde = Math.round((dinlenenSn / sarki.sure_sn) * 100);

    aktifOyun.turGecmisi.push({
      sarki_id: sarki.id,
      sonuc: "pes",
      asama: aktifOyun.asama,
      puan: 0,
      yuzde: yuzde
    });

    App.basarim.seriyiKir();
    App.roundResult.goster(false, 0, aktifOyun.asama, yuzde, 0, "pes");
  });

  App.game = {
    oyun: () => aktifOyun,
    turuAyarla
  };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/round-result.js ---- */
/* Tur sonu şarkı bilgi kartı */
(function (App) {
  'use strict';

  const { SesMotoru, router, formatTime, game } = App;

  const dinleEtiketi = (caliyor) => caliyor ? App.ikonlu("pause", "Durdur", 18) : App.ikonlu("play", "Kaydı dinle · 30 sn", 18);
  let previewFullPlaying = false;

  // Sekmeler: Sanatçı / Şarkı / Biliyor muydun?
  function sekmeSec(ad) {
    document.querySelectorAll("#answer-tabs .answer-tab").forEach(t => {
      const aktif = t.dataset.tab === ad;
      t.classList.toggle("active", aktif);
      t.setAttribute("aria-selected", aktif ? "true" : "false");
    });
    ["artist", "song", "fact"].forEach(p => {
      document.getElementById(`panel-${p}`).classList.toggle("active", p === ad);
    });
  }

  document.getElementById("answer-tabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".answer-tab");
    if (tab) sekmeSec(tab.dataset.tab);
  });

  // Uzun metni cümle sınırlarından orta uzunlukta paragraflara böler
  function paragraflaraBol(metin, hedefUzunluk) {
    const cumleler = String(metin || "").match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [];
    const paragraflar = [];
    let mevcut = "";
    cumleler.forEach(c => {
      if (mevcut && (mevcut + c).length > hedefUzunluk) {
        paragraflar.push(mevcut.trim());
        mevcut = "";
      }
      mevcut += c;
    });
    if (mevcut.trim()) paragraflar.push(mevcut.trim());
    return paragraflar;
  }

  function metniParagraflaraYaz(elementId, metin) {
    const el = document.getElementById(elementId);
    const paragraflar = paragraflaraBol(metin, 220);
    const ilk = el;
    ilk.textContent = paragraflar[0] || "";
    // Önceki turdan kalan ek paragrafları temizle
    while (ilk.nextElementSibling && ilk.nextElementSibling.dataset.ek === elementId) {
      ilk.nextElementSibling.remove();
    }
    let onceki = ilk;
    paragraflar.slice(1).forEach(p => {
      const ek = document.createElement("p");
      ek.className = "answer-text";
      ek.dataset.ek = elementId;
      ek.textContent = p;
      onceki.after(ek);
      onceki = ek;
    });
  }

  function goster(dogruMu, puan, asama, yuzde, ipucu, neden) {
    SesMotoru.durdur();
    previewFullPlaying = false;
    document.getElementById("card-preview-full-btn").innerHTML = dinleEtiketi(false);

    const aktifOyun = game.oyun();
    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
    const headerText = document.getElementById("result-header-text");

    // Doğru ve yanlış sonucu renk, ikon ve başlıkla net ayrışsın
    const kart = document.getElementById("result-card");
    kart.classList.toggle("result-correct", !!dogruMu);
    kart.classList.toggle("result-wrong", !dogruMu);

    if (dogruMu) {
      headerText.innerHTML = `<span class="rb-badge">${App.icon("check", 30)}</span><span class="rb-text"><span class="rb-title">Doğru!</span><span class="rb-sub">Aşama ${asama}'te, önizlemenin %${yuzde}'sini dinleyerek${ipucu ? `, ${ipucu} ipucu kullanarak` : ""} bildin.</span></span><span class="rb-points">+${puan}<small>PUAN</small></span>`;
    } else {
      const baslik = neden === "pes" ? "Pes ettin" : "Bilemedin";
      headerText.innerHTML = `<span class="rb-badge">${App.icon("x", 30)}</span><span class="rb-text"><span class="rb-title">${baslik}</span><span class="rb-sub">Doğru cevap aşağıda. Detayları inceleyebilirsin.</span></span><span class="rb-points">0<small>PUAN</small></span>`;
    }

    document.getElementById("card-lang-tag").textContent = sarki.dil === "tr" ? "Türkçe" : "Yabancı";
    document.getElementById("card-song-title").textContent = sarki.ad;
    document.getElementById("card-artist").textContent = sarki.sanatci;
    document.getElementById("card-year").textContent = sarki.yil;
    document.getElementById("card-genre").textContent = sarki.tur;
    document.getElementById("card-album").textContent = sarki.album;
    document.getElementById("card-duration").textContent = formatTime(sarki.sure_sn);
    metniParagraflaraYaz("card-artist-bio", sarki.sanatciBiyografi);
    metniParagraflaraYaz("card-story", `${sarki.hikaye} '${sarki.ad}', ${sarki.sanatci} imzasıyla ${sarki.yil} yılında '${sarki.album}' albümü içinde yer aldı ve İLK NOTA'da ${sarki.tur} kategorisinde sorulur.`);
    metniParagraflaraYaz("card-fact", sarki.ekBilgi);
    sekmeSec("artist");
    App.collection.butonuGuncelle();

    const nextBtn = document.getElementById("card-next-btn");
    nextBtn.textContent = (aktifOyun.turIndex + 1 >= aktifOyun.toplamTur) ? "Sonuçları Gör" : "Sonraki Tur";

    router.navigate("tur-sonu");
  }

  document.getElementById("card-preview-full-btn").addEventListener("click", () => {
    const aktifOyun = game.oyun();
    const sarki = aktifOyun.sarkilar[aktifOyun.turIndex];
    const btn = document.getElementById("card-preview-full-btn");

    if (previewFullPlaying) {
      SesMotoru.durdur();
      previewFullPlaying = false;
      btn.innerHTML = dinleEtiketi(false);
    } else {
      previewFullPlaying = true;
      btn.innerHTML = dinleEtiketi(true);
      SesMotoru.cal(
        sarki,
        0,
        sarki.sure_sn,
        () => {
          previewFullPlaying = false;
          btn.innerHTML = dinleEtiketi(false);
        },
        () => {
          previewFullPlaying = false;
          btn.innerHTML = dinleEtiketi(false);
        }
      );
    }
  });

  document.getElementById("card-next-btn").addEventListener("click", () => {
    SesMotoru.durdur();
    previewFullPlaying = false;

    const aktifOyun = game.oyun();
    if (aktifOyun.turIndex + 1 < aktifOyun.toplamTur) {
      router.navigate("oyun");
      game.turuAyarla(aktifOyun.turIndex + 1);
    } else {
      App.gameOver.goster();
    }
  });

  App.roundResult = { goster };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/game-over.js ---- */
/* Oyun sonu özet ekranı */
(function (App) {
  'use strict';

  const { appState, SARKILAR, SesMotoru, veriyiKaydet, router, game, escapeHtml } = App;

  function goster() {
    SesMotoru.durdur();

    const aktifOyun = game.oyun();
    const dogruSayisi = aktifOyun.turGecmisi.filter(t => t.sonuc === "dogru").length;
    const toplamPuan = aktifOyun.toplamPuan;

    let toplamYuzde = 0;
    aktifOyun.turGecmisi.forEach(t => toplamYuzde += t.yuzde);
    const ortYuzde = aktifOyun.turGecmisi.length > 0 ? Math.round(toplamYuzde / aktifOyun.turGecmisi.length) : 0;

    const eskiRekor = appState.en_yuksek_puan || 0;
    const yeniRekorMu = toplamPuan > eskiRekor;
    if (yeniRekorMu) {
      appState.en_yuksek_puan = toplamPuan;
    }

    const yeniKayit = {
      tarih_iso: new Date().toISOString(),
      dil: appState.ayarlar.dil,
      turler: [...appState.ayarlar.turler],
      adim_sn: aktifOyun.adimSn,
      tur_sayisi: aktifOyun.toplamTur,
      toplam_puan: toplamPuan,
      dogru_sayisi: dogruSayisi,
      ort_yuzde: ortYuzde,
      turlar: aktifOyun.turGecmisi
    };

    appState.gecmis.unshift(yeniKayit);
    if (appState.gecmis.length > 30) appState.gecmis.pop();
    veriyiKaydet();

    // Başarımlar: oyun sayacı ve yeni açılan rozetler
    const yeniRozetler = App.basarim.oyunBitti(dogruSayisi, aktifOyun.toplamTur);
    const rozetKutusu = document.getElementById("gameover-new-badges");
    rozetKutusu.style.display = yeniRozetler.length ? "block" : "none";
    rozetKutusu.innerHTML = yeniRozetler.map(r => `<div class="new-badge-row">${App.icon(r.ikon, 18)}<span><strong>Yeni rozet:</strong> ${escapeHtml(r.ad)} · ${escapeHtml(r.aciklama)}</span></div>`).join("");

    document.getElementById("gameover-record-badge").style.display = yeniRekorMu ? "inline-flex" : "none";
    document.getElementById("gameover-final-score").textContent = toplamPuan;
    document.getElementById("gameover-correct-ratio").textContent = `${dogruSayisi}/${aktifOyun.toplamTur}`;
    document.getElementById("gameover-avg-listen").textContent = `%${ortYuzde}`;

    const listContainer = document.getElementById("gameover-rounds-list");
    listContainer.innerHTML = "";

    aktifOyun.turGecmisi.forEach(t => {
      const sarki = SARKILAR.find(s => s.id === t.sarki_id) || { ad: "Bilinmeyen Şarkı", sanatci: "" };
      const row = document.createElement("div");
      row.className = "history-item";

      const isCorrect = t.sonuc === "dogru";
      row.innerHTML = `
        <div class="hi-left">
          <span class="hi-ico ${isCorrect ? "ok" : "bad"}">${App.icon(isCorrect ? "check" : "x", 20)}</span>
          <div>
            <div class="hi-title">${escapeHtml(sarki.ad)}</div>
            <div class="hi-sub">${escapeHtml(sarki.sanatci)} · Aşama ${t.asama}</div>
          </div>
        </div>
        <span class="hi-score ${isCorrect ? "" : "zero"}">${isCorrect ? `+${t.puan}` : "0"}</span>
      `;
      listContainer.appendChild(row);
    });

    router.navigate("ozet");
  }

  document.getElementById("gameover-replay-btn").addEventListener("click", () => {
    document.getElementById("start-game-btn").click();
  });

  document.getElementById("gameover-settings-btn").addEventListener("click", () => {
    router.navigate("ayarlar");
  });

  App.gameOver = { goster };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/stats.js ---- */
/* İstatistikler ekranı */
(function (App) {
  'use strict';

  const { appState, veriyiKaydet, router, ui, escapeHtml } = App;

  function renderStats() {
    const gecmis = appState.gecmis || [];
    document.getElementById("stats-total-games").textContent = gecmis.length;
    document.getElementById("stats-high-score").textContent = appState.en_yuksek_puan || 0;

    let toplamDogru = 0;
    let toplamTurSayisi = 0;
    gecmis.forEach(g => {
      toplamDogru += (g.dogru_sayisi || 0);
      toplamTurSayisi += (g.tur_sayisi || 0);
    });

    const genelOran = toplamTurSayisi > 0 ? Math.round((toplamDogru / toplamTurSayisi) * 100) : 0;
    document.getElementById("stats-accuracy").textContent = `%${genelOran}`;

    const historyContainer = document.getElementById("stats-history-list");
    historyContainer.innerHTML = "";

    if (gecmis.length === 0) {
      historyContainer.innerHTML = `<div class="empty-note">Henüz tamamlanan oyun yok.</div>`;
      return;
    }

    gecmis.slice(0, 10).forEach(g => {
      const item = document.createElement("div");
      item.className = "history-item";

      const date = new Date(g.tarih_iso);
      const dateStr = isNaN(date.getTime())
        ? "—"
        : `${date.toLocaleDateString("tr-TR")} ${date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}`;
      const dilAdi = g.dil === "yabanci" ? "Yabancı" : "Türkçe";
      const turlerStr = Array.isArray(g.turler) ? escapeHtml(g.turler.join(", ")) : "Karışık";

      item.innerHTML = `
        <div>
          <div class="hi-title">${dateStr} · ${dilAdi}</div>
          <div class="hi-sub">${turlerStr} · Adım ${escapeHtml(g.adim_sn)} sn</div>
        </div>
        <div class="hi-right">
          <div class="hi-score">${escapeHtml(g.toplam_puan)}</div>
          <div class="hi-sub">${escapeHtml(g.dogru_sayisi)}/${escapeHtml(g.tur_sayisi)} doğru</div>
        </div>
      `;
      historyContainer.appendChild(item);
    });
  }

  router.renderers.stats = renderStats;

  document.getElementById("stats-achievements-btn").addEventListener("click", () => router.navigate("basarimlar"));

  document.getElementById("stats-reset-btn").addEventListener("click", () => {
    ui.onayIste("Tüm oyun geçmişinizi ve rekorlarınızı silmek istediğinize emin misiniz?", () => {
      appState.en_yuksek_puan = 0;
      appState.gecmis = [];
      veriyiKaydet();
      renderStats();
    });
  });
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/backup.js ---- */
/* Veri yedekleme: tüm appState tek kod olarak kopyalanır / yüklenir (Profil ekranı) */
(function (App) {
  'use strict';

  const { ui, router } = App;

  // ----- Veri yedekleme: tüm appState tek kod olarak kopyalanır / yüklenir -----
  const yedekMsg = document.getElementById("backup-msg");
  const yedekYuklePanel = document.getElementById("backup-load-panel");
  const yedekCikti = document.getElementById("backup-output");

  function yedekMesaji(metin, basarili) {
    yedekMsg.textContent = metin;
    yedekMsg.className = "backup-msg " + (basarili ? "ok" : "err");
    yedekMsg.style.display = "block";
  }

  document.getElementById("backup-copy-btn").addEventListener("click", async () => {
    yedekYuklePanel.style.display = "none";
    const kod = App.veriyiDisaAktar();
    yedekCikti.value = kod;
    try {
      await navigator.clipboard.writeText(kod);
      yedekCikti.style.display = "none";
      yedekMesaji("Yedek kodu panoya kopyalandı. Başka bir cihazda “Veriyi Yükle” ile yapıştır.", true);
    } catch (e) {
      // Pano erişimi yoksa kodu gösterip elle kopyalatırız
      yedekCikti.style.display = "block";
      yedekCikti.focus();
      yedekCikti.select();
      yedekMesaji("Otomatik kopyalanamadı. Aşağıdaki kodu seçip elle kopyala.", false);
    }
  });

  document.getElementById("backup-load-btn").addEventListener("click", () => {
    yedekCikti.style.display = "none";
    yedekMsg.style.display = "none";
    const acik = yedekYuklePanel.style.display !== "none";
    yedekYuklePanel.style.display = acik ? "none" : "block";
    if (!acik) document.getElementById("backup-input").focus();
  });

  document.getElementById("backup-apply-btn").addEventListener("click", () => {
    const kod = document.getElementById("backup-input").value;
    ui.onayIste("Yedek kodundaki veriler şu anki oyun geçmişinin, rekorun ve ayarlarının üzerine yazılacak. Devam edilsin mi?", () => {
      const sonuc = App.veriyiIceAktar(kod);
      if (!sonuc.ok) {
        yedekMesaji(sonuc.hata, false);
        return;
      }
      document.getElementById("backup-input").value = "";
      yedekYuklePanel.style.display = "none";
      App.guncelleMuteUI();
      router.showScreen(router.getCurrentScreen());
      yedekMesaji("Veriler yüklendi.", true);
    });
  });
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/collection.js ---- */
/* Şarkı koleksiyonu: cevap ekranından kaydetme ve Koleksiyonum ekranında dinleme */
(function (App) {
  'use strict';

  const { appState, SARKILAR, SesMotoru, router, veriyiKaydet, escapeHtml, game } = App;

  const kaydetEtiketi = () => App.ikonlu("kalp", "Koleksiyona Kaydet", 18);
  const kayitliEtiketi = (ek) => App.ikonlu("kalpDolu", ek ? `Kaydedildi · ${escapeHtml(ek)}` : "Kaydedildi", 18);
  let caliyorId = null;

  const kayitIndeksi = (id) => appState.koleksiyon.findIndex(k => k.id === id);
  const sarkiBul = (id) => SARKILAR.find(s => s.id === id);

  function mesaj(metin, basarili) {
    const el = document.getElementById("collection-msg");
    el.textContent = metin;
    el.className = "backup-msg " + (basarili ? "ok" : "err");
    el.style.display = "block";
  }

  // ----- Cevap ekranındaki kaydet düğmesi -----
  function guncelSarki() {
    const oyun = game.oyun();
    return oyun.sarkilar[oyun.turIndex];
  }

  function butonuGuncelle() {
    const sarki = guncelSarki();
    const btn = document.getElementById("card-collection-btn");
    if (!sarki) return;
    btn.innerHTML = kayitIndeksi(sarki.id) >= 0 ? kayitliEtiketi() : kaydetEtiketi();
  }

  document.getElementById("card-collection-btn").addEventListener("click", () => {
    const sarki = guncelSarki();
    if (!sarki) return;
    const i = kayitIndeksi(sarki.id);
    const btn = document.getElementById("card-collection-btn");
    if (i >= 0) {
      appState.koleksiyon.splice(i, 1);
      veriyiKaydet();
      btn.innerHTML = kaydetEtiketi();
      return;
    }
    appState.koleksiyon.unshift({ id: sarki.id, tarih_iso: new Date().toISOString() });
    veriyiKaydet();
    const yeniRozetler = App.basarim.rozetleriKontrolEt();
    btn.innerHTML = kayitliEtiketi(yeniRozetler.length ? `Yeni rozet: ${yeniRozetler[0].ad}` : "");
  });

  // ----- Koleksiyonum ekranı -----
  function sureyiBitir() {
    caliyorId = null;
    renderCollection();
  }

  function renderCollection() {
    const liste = document.getElementById("collection-list");
    liste.innerHTML = "";
    document.getElementById("collection-count-pill").textContent = `${appState.koleksiyon.length} şarkı`;

    if (appState.koleksiyon.length === 0) {
      liste.innerHTML = `<div class="card collection-empty">
        <div class="vinyl" style="--v: 96px" aria-hidden="true"><div class="label"></div></div>
        Koleksiyonun henüz boş. Cevap ekranında “Koleksiyona Kaydet” düğmesine basarak şarkı ekleyebilirsin.
      </div>`;
      return;
    }

    appState.koleksiyon.forEach(kayit => {
      const sarki = sarkiBul(kayit.id);
      if (!sarki) return;
      const caliyor = caliyorId === sarki.id;
      const kart = document.createElement("div");
      kart.className = "card collection-card" + (caliyor ? " playing" : "");
      kart.innerHTML = `
        <div class="collection-top">
          <div class="vinyl mini-vinyl${caliyor ? " spin" : ""}" style="--v: 72px" aria-hidden="true"><div class="label"></div></div>
          <div class="collection-text">
            <div class="collection-title">${escapeHtml(sarki.ad)}</div>
            <div class="collection-artist">${escapeHtml(sarki.sanatci)}</div>
            <div class="collection-meta">${escapeHtml(sarki.yil)} · ${escapeHtml(sarki.album)} · ${escapeHtml(sarki.tur)}</div>
          </div>
        </div>
        <div class="collection-details" style="display: none;">
          <p class="answer-text"><strong>Sanatçı:</strong> ${escapeHtml(sarki.sanatciBiyografi)}</p>
          <p class="answer-text"><strong>Hikâye:</strong> ${escapeHtml(sarki.hikaye)}</p>
          <p class="answer-text"><strong>Biliyor muydun?</strong> ${escapeHtml(sarki.ekBilgi)}</p>
        </div>
        <div class="collection-actions">
          <button class="btn ${caliyor ? "btn-primary" : "btn-secondary"} col-play">${caliyor ? App.ikonlu("pause", "Durdur", 16) : App.ikonlu("play", "30 sn dinle", 16)}</button>
          <button class="btn btn-secondary col-info">Detaylar</button>
          <button class="btn btn-danger col-remove" aria-label="Koleksiyondan çıkar">${App.icon("cop", 18)}</button>
        </div>`;

      kart.querySelector(".col-info").addEventListener("click", () => {
        const d = kart.querySelector(".collection-details");
        d.style.display = d.style.display === "none" ? "flex" : "none";
      });

      kart.querySelector(".col-remove").addEventListener("click", () => {
        if (caliyorId === sarki.id) { SesMotoru.durdur(); caliyorId = null; }
        appState.koleksiyon = appState.koleksiyon.filter(k => k.id !== sarki.id);
        veriyiKaydet();
        renderCollection();
      });

      kart.querySelector(".col-play").addEventListener("click", () => {
        if (caliyorId === sarki.id) {
          SesMotoru.durdur();
          sureyiBitir();
          return;
        }
        caliyorId = sarki.id;
        renderCollection();
        SesMotoru.cal(sarki, 0, sarki.sure_sn, sureyiBitir, (hata) => {
          caliyorId = null;
          renderCollection();
          mesaj(hata, false);
        });
      });

      liste.appendChild(kart);
    });
  }

  router.renderers.collection = () => {
    caliyorId = null;
    document.getElementById("collection-msg").style.display = "none";
    renderCollection();
  };

  // Koleksiyon, Profil ekranından açılır ve geri tuşu Profil'e döner
  document.getElementById("profile-collection-btn").addEventListener("click", () => {
    SesMotoru.iosSesKilidiniAc();
    router.navigate("koleksiyon");
  });
  document.getElementById("collection-back-btn").addEventListener("click", () => router.navigate("profil"));

  App.collection = { butonuGuncelle };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/profile.js ---- */
/* Profil ekranı: isim, avatar, genel başarı yüzdesi, favori tür ve en iyi tahmin edilen şarkı */
(function (App) {
  'use strict';

  const { appState, SARKILAR, AVATARLAR, router, veriyiKaydet, escapeHtml } = App;

  const nameInput = document.getElementById("profile-name-input");
  const avatarGrid = document.getElementById("avatar-grid");
  const avatarPreview = document.getElementById("profile-avatar-preview");

  function avatarlariCiz() {
    avatarGrid.innerHTML = "";
    AVATARLAR.forEach(a => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "avatar-btn" + (appState.profil.avatar === a ? " active" : "");
      btn.innerHTML = App.icon(a, 24);
      btn.setAttribute("aria-label", `Avatar: ${a}`);
      btn.addEventListener("click", () => {
        appState.profil.avatar = a;
        veriyiKaydet();
        avatarlariCiz();
        avatarPreview.innerHTML = App.icon(a, 34);
      });
      avatarGrid.appendChild(btn);
    });
  }

  nameInput.addEventListener("input", () => {
    appState.profil.isim = nameInput.value.trim().slice(0, 20);
    veriyiKaydet();
  });

  // Geçmiş oyunların tur kayıtlarından profil istatistiklerini hesaplar
  function istatistikleriHesapla() {
    const sarkiHaritasi = new Map(SARKILAR.map(s => [s.id, s]));
    let toplamTur = 0;
    let dogruTur = 0;
    const turler = new Map();   // "Dil|Tür" -> { dogru, toplam, etiket }
    let enIyi = null;            // en az dinleyerek (sonra en yüksek puanla) bilinen şarkı

    appState.gecmis.forEach(oyun => {
      (Array.isArray(oyun.turlar) ? oyun.turlar : []).forEach(t => {
        const sarki = sarkiHaritasi.get(t.sarki_id);
        if (!sarki) return;
        toplamTur++;
        const anahtar = `${sarki.dil}|${sarki.tur}`;
        if (!turler.has(anahtar)) {
          turler.set(anahtar, { dogru: 0, toplam: 0, etiket: `${sarki.tur} (${sarki.dil === "tr" ? "Türkçe" : "Yabancı"})` });
        }
        const k = turler.get(anahtar);
        k.toplam++;
        if (t.sonuc === "dogru") {
          dogruTur++;
          k.dogru++;
          if (!enIyi || t.yuzde < enIyi.yuzde || (t.yuzde === enIyi.yuzde && t.puan > enIyi.puan)) {
            enIyi = { sarki, yuzde: t.yuzde, puan: t.puan, asama: t.asama };
          }
        }
      });
    });

    // Favori tür: en yüksek doğruluk oranı (eşitlikte daha çok tur oynanan)
    let favori = null;
    turler.forEach(k => {
      if (k.dogru === 0) return;
      const oran = k.dogru / k.toplam;
      if (!favori || oran > favori.oran || (oran === favori.oran && k.toplam > favori.toplam)) {
        favori = { ...k, oran };
      }
    });

    return { toplamTur, dogruTur, favori, enIyi };
  }

  function renderProfile() {
    nameInput.value = appState.profil.isim;
    avatarPreview.innerHTML = App.icon(appState.profil.avatar, 34);
    document.getElementById("profile-achievements-count").textContent = `${Object.keys(appState.basarim.rozetler).length}/${App.basarim.toplam}`;
    avatarlariCiz();

    document.getElementById("profile-collection-count").textContent = appState.koleksiyon.length;

    const s = istatistikleriHesapla();
    const oran = s.toplamTur > 0 ? Math.round((s.dogruTur / s.toplamTur) * 100) : 0;
    document.getElementById("profile-accuracy").textContent = `%${oran}`;
    document.getElementById("profile-games").textContent = appState.gecmis.length;

    const favEl = document.getElementById("profile-fav-genre");
    favEl.innerHTML = s.favori
      ? `<strong>${escapeHtml(s.favori.etiket)}</strong><span class="profile-sub">%${Math.round(s.favori.oran * 100)} doğruluk · ${s.favori.dogru}/${s.favori.toplam} tur</span>`
      : "Henüz yeterli veri yok";

    const bestEl = document.getElementById("profile-best-song");
    bestEl.innerHTML = s.enIyi
      ? `<strong>${escapeHtml(s.enIyi.sarki.ad)}</strong> — ${escapeHtml(s.enIyi.sarki.sanatci)}<span class="profile-sub">Önizlemenin yalnızca %${s.enIyi.yuzde}'ini dinleyerek (Aşama ${s.enIyi.asama}) bildin · +${s.enIyi.puan} puan</span>`
      : "Henüz yeterli veri yok";
  }

  router.renderers.profile = renderProfile;

  document.getElementById("menu-profile-btn").addEventListener("click", () => router.navigate("profil"));
  document.getElementById("profile-achievements-btn").addEventListener("click", () => router.navigate("basarimlar"));
})(window.IlkNota = window.IlkNota || {});


/* ---- js/screens/achievements.js ---- */
/* Başarımlar ve rozetler: günlük giriş serisi, doğru tahmin serisi ve görev ilerlemeleri */
(function (App) {
  'use strict';

  const { appState, veriyiKaydet, router, escapeHtml } = App;

  function tarihMetni(d) {
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  // Rozet tanımları: deger() mevcut ilerlemeyi, hedef gereken değeri verir
  const ROZETLER = [
    { id: "ilk_oyun", ikon: "play", ad: "İlk Adım", aciklama: "1 oyun tamamla", hedef: 1, deger: () => appState.basarim.toplam_oyun },
    { id: "on_oyun", ikon: "plak", ad: "Düzenli Oyuncu", aciklama: "10 oyun tamamla", hedef: 10, deger: () => appState.basarim.toplam_oyun },
    { id: "seri_3", ikon: "alev", ad: "Isınıyoruz", aciklama: "Üst üste 3 şarkı bil", hedef: 3, deger: () => appState.basarim.en_iyi_dogru_serisi },
    { id: "seri_5", ikon: "simsek", ad: "Keskin Kulak", aciklama: "Üst üste 5 şarkı bil", hedef: 5, deger: () => appState.basarim.en_iyi_dogru_serisi },
    { id: "seri_10", ikon: "tac", ad: "Müzik Dehası", aciklama: "Üst üste 10 şarkı bil", hedef: 10, deger: () => appState.basarim.en_iyi_dogru_serisi },
    { id: "giris_3", ikon: "takvim", ad: "Alışkanlık", aciklama: "3 gün üst üste giriş yap", hedef: 3, deger: () => appState.basarim.en_uzun_giris },
    { id: "giris_7", ikon: "yildiz", ad: "Haftalık Sadakat", aciklama: "7 gün üst üste giriş yap", hedef: 7, deger: () => appState.basarim.en_uzun_giris },
    { id: "ilk_asama", ikon: "hedef", ad: "Anında Tanıdım", aciklama: "İlk aşamada toplam 10 şarkı bil", hedef: 10, deger: () => appState.basarim.ilk_asama_dogru },
    { id: "mukemmel", ikon: "kupa", ad: "Kusursuz Oyun", aciklama: "Bir oyunda tüm şarkıları bil", hedef: 1, deger: () => appState.basarim.mukemmel_oyun },
    { id: "koleksiyoncu", ikon: "kalp", ad: "Koleksiyoncu", aciklama: "Koleksiyonuna 5 şarkı kaydet", hedef: 5, deger: () => appState.koleksiyon.length }
  ];

  /* Eşiği geçen ve henüz verilmemiş rozetleri açar; yeni açılanları döndürür */
  function rozetleriKontrolEt() {
    const yeni = [];
    ROZETLER.forEach(r => {
      if (!appState.basarim.rozetler[r.id] && r.deger() >= r.hedef) {
        appState.basarim.rozetler[r.id] = new Date().toISOString();
        yeni.push(r);
      }
    });
    if (yeni.length) veriyiKaydet();
    return yeni;
  }

  // ----- Sayaçlar -----
  function girisSerisiniGuncelle() {
    const b = appState.basarim;
    const bugun = tarihMetni(new Date());
    if (b.son_giris === bugun) return;
    const dun = new Date();
    dun.setDate(dun.getDate() - 1);
    b.giris_serisi = b.son_giris === tarihMetni(dun) ? b.giris_serisi + 1 : 1;
    b.son_giris = bugun;
    b.en_uzun_giris = Math.max(b.en_uzun_giris, b.giris_serisi);
    rozetleriKontrolEt();
    veriyiKaydet();
  }

  function dogruTahmin(ilkAsamaMi) {
    const b = appState.basarim;
    b.dogru_serisi++;
    b.en_iyi_dogru_serisi = Math.max(b.en_iyi_dogru_serisi, b.dogru_serisi);
    b.toplam_dogru++;
    if (ilkAsamaMi) b.ilk_asama_dogru++;
    veriyiKaydet();
  }

  function seriyiKir() {
    appState.basarim.dogru_serisi = 0;
    veriyiKaydet();
  }

  /* Oyun bittiğinde çağrılır; yeni açılan rozetleri döndürür */
  function oyunBitti(dogruSayisi, turSayisi) {
    const b = appState.basarim;
    b.toplam_oyun++;
    if (turSayisi > 0 && dogruSayisi === turSayisi) b.mukemmel_oyun++;
    veriyiKaydet();
    return rozetleriKontrolEt();
  }

  // ----- Ekran -----
  function renderAchievements() {
    rozetleriKontrolEt();
    const b = appState.basarim;
    document.getElementById("ach-login-streak").textContent = b.giris_serisi;
    const seriEl = document.getElementById("ach-correct-streak");
    seriEl.textContent = b.dogru_serisi;
    seriEl.nextElementSibling.textContent = `Doğru tahmin serisi · en iyi ${b.en_iyi_dogru_serisi}`;

    const acilan = ROZETLER.filter(r => b.rozetler[r.id]).length;
    document.getElementById("ach-count").textContent = `${acilan}/${ROZETLER.length} açıldı`;

    const liste = document.getElementById("ach-list");
    liste.innerHTML = "";
    ROZETLER.forEach(r => {
      const acik = !!b.rozetler[r.id];
      const mevcut = Math.min(r.deger(), r.hedef);
      const yuzde = Math.round((mevcut / r.hedef) * 100);
      const kart = document.createElement("div");
      kart.className = "ach-card" + (acik ? " unlocked" : " locked");
      const tarih = acik && b.rozetler[r.id] ? new Date(b.rozetler[r.id]).toLocaleDateString("tr-TR") : "";
      kart.innerHTML = `
        <div class="ach-icon">${App.icon(acik ? r.ikon : "kilit", 26)}</div>
        <div class="ach-body">
          <div class="ach-name">${escapeHtml(r.ad)}${acik ? ` <span class="ach-date">${escapeHtml(tarih)}</span>` : ""}</div>
          <div class="ach-desc">${escapeHtml(r.aciklama)}</div>
          <div class="ach-progress"><div class="ach-progress-fill" style="width: ${yuzde}%"></div></div>
          <div class="ach-progress-text">${mevcut} / ${r.hedef}</div>
        </div>`;
      liste.appendChild(kart);
    });
  }

  router.renderers.achievements = renderAchievements;

  App.basarim = { toplam: ROZETLER.length, girisSerisiniGuncelle, dogruTahmin, seriyiKir, oyunBitti, rozetleriKontrolEt };
})(window.IlkNota = window.IlkNota || {});


/* ---- js/main.js ---- */
/* Uygulama başlatıcı: kayıtlı veriyi yükler ve ilk ekranı açar */
(function (App) {
  'use strict';

  App.veriyiYukle();
  App.guncelleMuteUI();
  App.basarim.girisSerisiniGuncelle();

  // Sekme/uygulama arka plana alınınca (özellikle iOS Safari ve uygulama içi tarayıcılar) sesi kes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) App.SesMotoru.durdur();
  });
  window.addEventListener("pagehide", () => App.SesMotoru.durdur());

  const initialHash = (location.hash || "").replace("#/", "");
  const acilisRotalari = ["menu", "nasil-oynanir", "ayarlar", "istatistikler", "koleksiyon", "profil", "basarimlar"];
  if (initialHash && acilisRotalari.includes(initialHash)) {
    App.router.handleRoute(initialHash);
  } else {
    App.router.handleRoute("menu");
  }
})(window.IlkNota = window.IlkNota || {});
