import { Show } from '../types';

export const SHOWS_DATA: Show[] = [
  {
    id: 'show-1',
    title: "Billionaire's Revenge",
    titleHindi: "अरबपति का इंतकाम",
    tagline: "जिसने ठुकराया था, उसी की कंपनी खरीद कर लौटा वो...",
    synopsis: "कबीर एक साधारण लड़का था जिसे उसकी प्रेमिका की अमीर फैमिली ने बेइज्जत करके धक्के मारकर निकाला। 5 साल बाद कबीर लंदन का सबसे बड़ा अरबपति बनकर लौटा है, बदला लेने के लिए...",
    category: 'desi_mafia',
    format: 'micro_drama',
    rating: 4.9,
    ratingCount: '240K',
    viewsCount: '18.4M',
    episodeCount: 45,
    language: 'Hindi & Bhojpuri',
    coverGradient: 'from-amber-950 via-neutral-900 to-black',
    coverAccent: '#eab308',
    badge: 'TOP 1 TRENDING',
    isTrending: true,
    isTop10: 1,
    isExclusive: true,
    narratorOrCast: 'Vikram Singh, Ananya Roy',
    comments: [
      { id: 'c1', userName: 'Rajesh Sharma', userAvatarBg: 'bg-emerald-600', comment: 'Episode 3 me jo twist aya, maza aa gaya! Best micro drama!', timeAgo: '2 ghante pehle', likes: 452 },
      { id: 'c2', userName: 'Pooja Verma', userAvatarBg: 'bg-rose-600', comment: 'Kabir ki entry par goosebumps aa gaye! Waiting for next season', timeAgo: '5 ghante pehle', likes: 219 },
      { id: 'c3', userName: 'Amitabh Tiwari', userAvatarBg: 'bg-blue-600', comment: 'SK TV ka content Kuku TV se bhi behtar lag raha hai fast loading!', timeAgo: '1 din pehle', likes: 630 }
    ],
    episodes: [
      {
        id: 'ep-1-1',
        episodeNumber: 1,
        title: 'द ग्रेट इंसल्ट (The Great Humiliation)',
        duration: '1:45',
        durationSec: 105,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'कबीर को बारिश में बंगले के बाहर धक्के मार कर फेंक दिया जाता है।',
        audioAmbiance: 'drama',
        dialogueScript: [
          { speaker: 'मिस्टर सिंघानिया', text: 'तेरी औकात क्या है कबीर? मेरी बेटी को भूल जा!', time: 5 },
          { speaker: 'कबीर', text: 'आज आप मुझे औकात सिखा रहे हैं? याद रखिएगा यह दिन...', time: 22 },
          { speaker: 'नैरेटर', text: 'बारिश की बूंदों के बीच कबीर की आँखों में सिर्फ अंगारे धधक रहे थे।', time: 48 },
          { speaker: 'कबीर', text: '5 साल बाद, इसी जमीन पर आपका साम्राज्य मेरे कदमों में होगा!', time: 75 }
        ]
      },
      {
        id: 'ep-1-2',
        episodeNumber: 2,
        title: 'लंदन का नया सुल्तान (Return of the Tycoon)',
        duration: '1:52',
        durationSec: 112,
        isFree: true,
        coinsRequired: 0,
        synopsis: '5 साल बाद मुंबई एयरपोर्ट पर प्राइवेट जेट से उतरा एक मिस्टीरियस बिजनेसमैन।',
        audioAmbiance: 'thriller',
        dialogueScript: [
          { speaker: 'एयरपोर्ट सुरक्षा', text: 'रास्ता खाली करो! रॉय इंडस्ट्रीज के चेयरमैन आ रहे हैं!', time: 6 },
          { speaker: 'सेक्रेटरी रिया', text: 'सर, सिंघानिया ग्रुप दिवालिया होने की कगार पर है।', time: 28 },
          { speaker: 'कबीर', text: 'उन्हें बिकने मत दो... पूरी 500 करोड़ की डील मैं अकेले खरीदूंगा!', time: 60 }
        ]
      },
      {
        id: 'ep-1-3',
        episodeNumber: 3,
        title: 'नीलामी का घमासान (The Auction Showdown)',
        duration: '2:10',
        durationSec: 130,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'सिंघानिया मेंशन की नीलामी में कबीर की अचानक एंट्री से सब हैरान।',
        audioAmbiance: 'drama',
        dialogueScript: [
          { speaker: 'ऑक्शनर', text: '50 करोड़ की पहली बोली... कोई और?', time: 10 },
          { speaker: 'कबीर', text: '100 करोड़! कैश डाउन, इसी वक्त!', time: 35 },
          { speaker: 'सिंघानिया', text: 'ये... ये तो कबीर है? ये कैसे मुमकिन है?!', time: 70 }
        ]
      },
      {
        id: 'ep-1-4',
        episodeNumber: 4,
        title: 'राज का पर्दाफाश (Dark Truth Revealed)',
        duration: '1:58',
        durationSec: 118,
        isFree: false,
        coinsRequired: 10,
        synopsis: 'कबीर को पता चलता है कि 5 साल पहले उसके साथ धोखा किसने किया था।',
        audioAmbiance: 'thriller',
        dialogueScript: [
          { speaker: 'रिया', text: 'सर, उस रात जो कागजात चोरी हुए थे, उसका मास्टरमाइंड सिंघानिया नहीं था...', time: 12 },
          { speaker: 'कबीर', text: 'तो फिर कौन था वो गद्दार?!', time: 40 }
        ]
      },
      {
        id: 'ep-1-5',
        episodeNumber: 5,
        title: 'अंतिम फैसला (The Ultimate Vow)',
        duration: '2:15',
        durationSec: 135,
        isFree: false,
        coinsRequired: 10,
        synopsis: 'कबीर और उसकी एक्स-लवर आमने-सामने एक होटल के पेंटहाउस में।',
        audioAmbiance: 'romance',
        dialogueScript: [
          { speaker: 'तान्या', text: 'कबीर... मैंने तुम्हें कभी धोखा नहीं दिया था, मुझे मजबूर किया गया!', time: 15 },
          { speaker: 'कबीर', text: 'अब बहुत देर हो चुकी है मिस तान्या। खेल अब मेरे नियमों पर चलेगा।', time: 50 }
        ]
      }
    ]
  },
  {
    id: 'show-2',
    title: 'Midnight Haunting: Haveli 1947',
    titleHindi: 'रात 12 बजे की हवेली',
    tagline: 'जिस हवेली में कोई परिंदा भी पर नहीं मारता, वहाँ रोज बजती हैं घुंघरू...',
    synopsis: 'राजस्थान के बीहड़ों में 80 साल से बंद पड़ी सूर्यगढ़ हवेली की चाबी जब एक युवा आर्किटेक्ट को मिलती है, तो उसे अहसास होता है कि हवेली में वो अकेला नहीं है...',
    category: 'horror',
    format: 'audio_story',
    rating: 4.8,
    ratingCount: '185K',
    viewsCount: '12.8M',
    episodeCount: 60,
    language: 'Hindi (Full 3D Audio)',
    coverGradient: 'from-purple-950 via-slate-900 to-black',
    coverAccent: '#a855f7',
    badge: '3D AUDIO NOVEL',
    isTrending: true,
    isTop10: 2,
    narratorOrCast: 'Voice of Sameer Goswami (RJ)',
    comments: [
      { id: 'c4', userName: 'Kunal Sen', userAvatarBg: 'bg-indigo-600', comment: 'Headphone laga ke suna, sach me roongte khade ho gaye bhai!', timeAgo: '3 ghante pehle', likes: 780 },
      { id: 'c5', userName: 'Sunita Devi', userAvatarBg: 'bg-purple-600', comment: 'Background sound effect itna realistic hai ki dar lagta hai', timeAgo: '1 din pehle', likes: 312 }
    ],
    episodes: [
      {
        id: 'ep-2-1',
        episodeNumber: 1,
        title: 'बंद दरवाजे की चीख (Scream Behind The Locked Door)',
        duration: '12:30',
        durationSec: 750,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'आर्किटेक्ट आर्यन हवेली के भारी लोहे के गेट को खोलता है और अंधेरे में दाखिल होता है।',
        audioAmbiance: 'horror',
        dialogueScript: [
          { speaker: 'नैरेटर', text: 'रात का सन्नाटा ऐसा था मानो हवा भी सांस लेने से डर रही हो...', time: 8 },
          { speaker: 'आर्यन', text: 'कोई है यहाँ? चौकीदार काका?!', time: 45 },
          { speaker: 'रहस्यमयी आवाज़', text: 'यहाँ मत आओ... चले जाओ... वर्ना तुम्हारी रूह भी यहीं कैद हो जाएगी!', time: 120 }
        ]
      },
      {
        id: 'ep-2-2',
        episodeNumber: 2,
        title: 'घुंघरू की रहस्यमयी ताल (Ghroo in the Mist)',
        duration: '14:10',
        durationSec: 850,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'हवेली के दर्पण कक्ष में रात ठीक 12 बजे एक परछाई थिरकने लगती है।',
        audioAmbiance: 'horror',
        dialogueScript: [
          { speaker: 'नैरेटर', text: 'छन-छन... छन-छन... वो आवाज़ पहले दूर थी, फिर बिल्कुल आर्यन के कान के पास आ गई!', time: 10 }
        ]
      },
      {
        id: 'ep-2-3',
        episodeNumber: 3,
        title: 'तहखाने की पुरानी डायरी (The Basement Secrets)',
        duration: '15:20',
        durationSec: 920,
        isFree: false,
        coinsRequired: 15,
        synopsis: 'सन 1947 की एक पुरानी डायरी मिलती है जिसमें हवेली के राजा की हत्या का सच दर्ज है।',
        audioAmbiance: 'horror',
        dialogueScript: [
          { speaker: 'आर्यन', text: 'यह डायरी... इसमें तो खून के धब्बे सूखे हुए हैं!', time: 20 }
        ]
      }
    ]
  },
  {
    id: 'show-3',
    title: 'Secret Mafia Son-In-Law',
    titleHindi: 'माफिया दामाद का कहर',
    tagline: 'ससुराल वालों ने समझा ड्राइवर, निकला अंडरवर्ल्ड का बादशाह!',
    synopsis: 'रुद्र अपनी पहचान छुपाकर एक अमीर घराने में घर-जमाई बनकर रह रहा था। जब उसकी पत्नी की जान खतरे में पड़ी, तो रुद्र ने 10 साल बाद अपना पुराना खौफनाक रूप दिखाया।',
    category: 'desi_mafia',
    format: 'micro_drama',
    rating: 4.9,
    ratingCount: '310K',
    viewsCount: '25.6M',
    episodeCount: 80,
    language: 'Hindi',
    coverGradient: 'from-red-950 via-neutral-900 to-black',
    coverAccent: '#ef4444',
    badge: 'SUPER HIT DRAMA',
    isTrending: true,
    isTop10: 3,
    isExclusive: true,
    narratorOrCast: 'Ronit Roy, Shreya Patel',
    comments: [
      { id: 'c6', userName: 'Vicky Rajput', userAvatarBg: 'bg-red-600', comment: 'Rudra ka attitude level 1000! Pocket FM and Kuku TV se bhi tagda!', timeAgo: '40 min pehle', likes: 980 }
    ],
    episodes: [
      {
        id: 'ep-3-1',
        episodeNumber: 1,
        title: 'लाचारी का मुखौटा (Mask of Silence)',
        duration: '2:05',
        durationSec: 125,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'ससुराल की पार्टी में रुद्र को वेटर का काम करने के लिए मजबूर किया जाता है।',
        audioAmbiance: 'drama',
        dialogueScript: [
          { speaker: 'साला', text: 'ऐ रुद्र! मेहमानों को ड्रिंक सर्व कर, चुपचाप!', time: 10 },
          { speaker: 'रुद्र', text: 'जी भैया, अभी लाया...', time: 25 },
          { speaker: 'नैरेटर', text: 'रुद्र के हाथों में जब कांच का ग्लास टूटा, तो किसी को अंदाज़ा नहीं था कि ये शेर अब जाग चुका है।', time: 55 }
        ]
      },
      {
        id: 'ep-3-2',
        episodeNumber: 2,
        title: 'काली गाड़ी का काफ़िला (The Don Awakens)',
        duration: '1:50',
        durationSec: 110,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'शहर के सबसे बड़े गैंगस्टर ने जब रुद्र को देखा तो घुटनों पर गिर पड़ा।',
        audioAmbiance: 'thriller',
        dialogueScript: [
          { speaker: 'गैंगस्टर भाईजान', text: 'मालिक! आप... आप ज़िंदा हैं?! हम 7 साल से आपको तलाश रहे थे!', time: 15 },
          { speaker: 'रुद्र', text: 'खड़े हो जाओ। शहर को बता दो, उनका असली सुल्तान वापस आ गया है।', time: 45 }
        ]
      },
      {
        id: 'ep-3-3',
        episodeNumber: 3,
        title: 'पत्नी के सामने सच (Facing the Truth)',
        duration: '2:12',
        durationSec: 132,
        isFree: false,
        coinsRequired: 10,
        synopsis: 'रुद्र की पत्नी अवनि ने जब अपने पति को 100 गाडियों के काफिले के बीच देखा।',
        audioAmbiance: 'drama',
        dialogueScript: [
          { speaker: 'अवनि', text: 'रुद्र... तुम कौन हो? तुम वो नहीं हो जो 2 साल से मेरे घर में पोछा लगाते थे!', time: 18 }
        ]
      }
    ]
  },
  {
    id: 'show-4',
    title: 'The Royal Bride: Shaadi Aur Saazish',
    titleHindi: 'शाही दुल्हन और साज़िश',
    tagline: 'सोने के महल में छुपी थी एक खौफनाक वसीयत...',
    synopsis: 'अनामिका की शादी उदयपुर के युवराज दिग्विजय सिंह से होती है। लेकिन शादी की पहली रात युवराज गायब हो जाता है और महल में सिर्फ उसकी खून से सनी शेरवानी मिलती है।',
    category: 'royal',
    format: 'micro_drama',
    rating: 4.7,
    ratingCount: '95K',
    viewsCount: '7.2M',
    episodeCount: 52,
    language: 'Hindi & Rajasthani',
    coverGradient: 'from-amber-900 via-stone-900 to-black',
    coverAccent: '#f59e0b',
    badge: 'ROYAL MYSTERY',
    isTrending: false,
    isTop10: 4,
    narratorOrCast: 'Dheeraj Dhoopar, Kritika Kamra',
    comments: [
      { id: 'c7', userName: 'Neha Rathore', userAvatarBg: 'bg-amber-600', comment: 'Rajputana royal costume and background setting is so royal and aesthetic!', timeAgo: '6 ghante pehle', likes: 145 }
    ],
    episodes: [
      {
        id: 'ep-4-1',
        episodeNumber: 1,
        title: 'सुहागरात की चीख (The Wedding Night Shock)',
        duration: '2:00',
        durationSec: 120,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'महल के कमरा नंबर 7 में अचानक चीख गूंजती है और बिजली गुल हो जाती है।',
        audioAmbiance: 'thriller',
        dialogueScript: [
          { speaker: 'अनामिका', text: 'दिग्विजय जी... आप कहाँ हैं? ये बत्तियां क्यों बुझ गईं?', time: 12 },
          { speaker: 'नैरेटर', text: 'जब लालटेन जली, तो फर्श पर सिर्फ खून के ताज़ा निशान थे जो खिड़की की तरफ जा रहे थे।', time: 40 }
        ]
      },
      {
        id: 'ep-4-2',
        episodeNumber: 2,
        title: 'राजमाता का हुक्म (Queen Mothers Order)',
        duration: '1:45',
        durationSec: 105,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'राजमाता पुलिस बुलाने से मना कर देती हैं। क्यों?',
        audioAmbiance: 'drama',
        dialogueScript: [
          { speaker: 'राजमाता', text: 'इस महल की बात बाहर नहीं जाएगी बहू! चुपचाप कमरे में जाओ!', time: 15 }
        ]
      }
    ]
  },
  {
    id: 'show-5',
    title: 'Love, Lies & 300 Crores',
    titleHindi: 'इश्क, धोखा और 300 करोड़',
    tagline: 'मोहब्बत में दी गई क़सम सबसे बड़ा हथियार बन गई...',
    synopsis: 'एक स्मार्ट इन्वेस्टमेंट बैंकर और एक सीक्रेट एजेंट के बीच की खतरनाक प्रेम कहानी, जहाँ हर किस के पीछे एक कैमरा और हर वादे के पीछे एक घोटाला छुपा था।',
    category: 'thriller',
    format: 'audio_story',
    rating: 4.8,
    ratingCount: '142K',
    viewsCount: '9.6M',
    episodeCount: 38,
    language: 'Hindi (Stereo HD)',
    coverGradient: 'from-cyan-950 via-zinc-900 to-black',
    coverAccent: '#06b6d4',
    badge: 'CRIME THRILLER',
    isTrending: true,
    isTop10: 5,
    narratorOrCast: 'Karan Mehra & RJ Sayema',
    comments: [
      { id: 'c8', userName: 'Deepak Jha', userAvatarBg: 'bg-cyan-600', comment: 'Har episode me aisi suspense banti hai ki agla episode sunna hi padta hai!', timeAgo: '1 ghanta pehle', likes: 320 }
    ],
    episodes: [
      {
        id: 'ep-5-1',
        episodeNumber: 1,
        title: 'पहली नज़र का जाल (The First Trap)',
        duration: '11:15',
        durationSec: 675,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'गोवा के एक कसीनो में नताशा की मुलाकात अर्जुन से होती है।',
        audioAmbiance: 'romance',
        dialogueScript: [
          { speaker: 'नताशा', text: 'आप हमेशा इतना जीतते हैं या आज मेरी मौजूदगी का जादू है?', time: 15 },
          { speaker: 'अर्जुन', text: 'जादू आपकी मुस्कान में है मिस नताशा... या शायद आपके खुफिया इरादों में?', time: 45 }
        ]
      },
      {
        id: 'ep-5-2',
        episodeNumber: 2,
        title: 'स्विस बैंक का कोड (The Swiss Code)',
        duration: '13:40',
        durationSec: 820,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'अर्जुन के लैपटॉप से डेटा चुराते वक्त अलार्म बज जाता है।',
        audioAmbiance: 'thriller',
        dialogueScript: [
          { speaker: 'कंप्यूटर', text: 'Warning: Security Breach in Sector 4!', time: 10 }
        ]
      }
    ]
  },
  {
    id: 'show-6',
    title: 'Village Baahubali: Nyay Ka Kanoon',
    titleHindi: 'गाँव का बाहुबली: न्याय',
    tagline: 'जब अदालतें बिकीं, तो किसान के बेटे ने खुद उठाई लाठी!',
    synopsis: 'बिहार-यूपी की सीमा पर बसे रामगढ़ गाँव में जमींदार के जुल्मों के खिलाफ खड़ा हुआ एक नौजवान शिक्षक, जिसकी आवाज़ अब पूरे सूबे की ताकत बन चुकी है।',
    category: 'desi_mafia',
    format: 'micro_drama',
    rating: 4.9,
    ratingCount: '410K',
    viewsCount: '32.1M',
    episodeCount: 65,
    language: 'Bhojpuri & Hindi',
    coverGradient: 'from-orange-950 via-stone-900 to-black',
    coverAccent: '#f97316',
    badge: 'DESI BLOCKBUSTER',
    isTrending: true,
    isTop10: 6,
    isExclusive: true,
    narratorOrCast: 'Pawan Kalyan style, Manoj Tiwari narration',
    comments: [
      { id: 'c9', userName: 'Sunil Paswan', userAvatarBg: 'bg-orange-600', comment: 'Desi dialogue itna solid ba ki dil garden garden ho gail! Jai Bihar!', timeAgo: '10 min pehle', likes: 1240 }
    ],
    episodes: [
      {
        id: 'ep-6-1',
        episodeNumber: 1,
        title: 'चौपाल में ललकार (Challenge at the Chaupal)',
        duration: '1:55',
        durationSec: 115,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'मुखिया के गुंडों ने जब किसान की ज़मीन छीननी चाही, तो वीरेंद्र ने लाठी संभाल ली।',
        audioAmbiance: 'drama',
        dialogueScript: [
          { speaker: 'मुखिया', text: 'अरे मास्टर के लईका! हमरा सामने ज़बान लड़ावे के हिम्मत?', time: 10 },
          { speaker: 'वीरेंद्र', text: 'मुखिया जी, ज़बान भी लड़ईब और ज़रूरत पड़ी त इंसाफ खातिर छाती पर चढ़ के हक छीनब!', time: 35 }
        ]
      },
      {
        id: 'ep-6-2',
        episodeNumber: 2,
        title: 'दबंगों का फैसला (The Reckoning)',
        duration: '2:04',
        durationSec: 124,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'गाँव की पंचायत में पूरे 500 किसान वीरेंद्र के पीछे खड़े हो जाते हैं।',
        audioAmbiance: 'drama',
        dialogueScript: [
          { speaker: 'वीरेंद्र', text: 'अब इस गाँव में कोई किसान नहीं रोयेगा! ये वीरेंद्र का वचन है!', time: 20 }
        ]
      }
    ]
  },
  {
    id: 'show-7',
    title: 'The Mystical Tantrik & Chudail',
    titleHindi: 'कब्रिस्तान की चुड़ैल और अघोरी',
    tagline: 'अमावस्या की रात जब श्मशान में तंत्र साधना जागी...',
    synopsis: 'काशी के मणिकर्णिका घाट पर रहने वाले एक अघोरी बाबा को पता चलता है कि 100 साल पुरानी चुड़ैल शहर के मासूम बच्चों को अपने वश में कर रही है। एक महा-टक्कर की कहानी।',
    category: 'horror',
    format: 'audio_story',
    rating: 4.8,
    ratingCount: '160K',
    viewsCount: '11.4M',
    episodeCount: 40,
    language: 'Hindi (Dolby Atmos Audio)',
    coverGradient: 'from-emerald-950 via-slate-900 to-black',
    coverAccent: '#10b981',
    badge: 'SUPER NATURAL',
    isTrending: false,
    isTop10: 7,
    narratorOrCast: 'Voice of Shivam Tiwari (Bhairav)',
    comments: [
      { id: 'c10', userName: 'Rohit Keshari', userAvatarBg: 'bg-emerald-600', comment: 'Bhoot pret kahaniyon me iska sound effect ekdum top level hai', timeAgo: '8 ghante pehle', likes: 410 }
    ],
    episodes: [
      {
        id: 'ep-7-1',
        episodeNumber: 1,
        title: 'शंखनाद और भस्म (Conch & Ashes)',
        duration: '14:00',
        durationSec: 840,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'अमावस्या की मध्यरात्रि में गंगा किनारे गूंजा डमरू का नाद।',
        audioAmbiance: 'horror',
        dialogueScript: [
          { speaker: 'अघोरी बाबा', text: 'हर हर महादेव! आज की रात कोई प्रेत इस घाट को अपवित्र नहीं कर सकता!', time: 15 }
        ]
      }
    ]
  },
  {
    id: 'show-8',
    title: 'College Rebel & Campus Queen',
    titleHindi: 'कॉलेज का बागी और हसीना',
    tagline: 'दिल की जंग में कानून नहीं, सिर्फ मोहब्बत चलती है...',
    synopsis: 'दिल्ली यूनिवर्सिटी का सबसे खतरनाक और दबंग छात्र नेता कबीर, और वाइस-चांसलर की खूबसूरत बेटी समायरा के बीच नफरत से शुरू होकर जानलेवा इश्क तक का सफर।',
    category: 'romance',
    format: 'micro_drama',
    rating: 4.9,
    ratingCount: '340K',
    viewsCount: '21.0M',
    episodeCount: 50,
    language: 'Hinglish & Hindi',
    coverGradient: 'from-pink-950 via-neutral-900 to-black',
    coverAccent: '#ec4899',
    badge: 'CAMPUS ROMANCE',
    isTrending: true,
    isTop10: 8,
    narratorOrCast: 'Zayn Ibad Khan, Palak Purswani',
    comments: [
      { id: 'c11', userName: 'Simran Gill', userAvatarBg: 'bg-pink-600', comment: 'Kabir and Samaira are literally couple goals! Loved their chemistry!', timeAgo: '12 min pehle', likes: 1540 }
    ],
    episodes: [
      {
        id: 'ep-8-1',
        episodeNumber: 1,
        title: 'पहली टक्कर (The First Clash)',
        duration: '1:48',
        durationSec: 108,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'कॉलेज कैंटीन में कबीर की बाइक से समायरा की कार टकराती है।',
        audioAmbiance: 'romance',
        dialogueScript: [
          { speaker: 'समायरा', text: 'तुम्हें गाड़ी चलाना नहीं आता क्या मिस्टर बदतमीज?!', time: 10 },
          { speaker: 'कबीर', text: 'गाड़ी चलाना भी आता है, और जो रास्ता रोके उसे दिल से हटाना भी...', time: 30 }
        ]
      },
      {
        id: 'ep-8-2',
        episodeNumber: 2,
        title: 'बारिश और छाता (Rain & Confession)',
        duration: '2:01',
        durationSec: 121,
        isFree: true,
        coinsRequired: 0,
        synopsis: 'लाइब्रेरी की छत पर जब दोनों मूसलाधार बारिश में फंस गए।',
        audioAmbiance: 'romance',
        dialogueScript: [
          { speaker: 'समायरा', text: 'तुम इतने बुरे नहीं हो जितना दिखाते हो कबीर...', time: 15 },
          { speaker: 'कबीर', text: 'अच्छा बनके देख चुका हूँ समायरा, दुनिया सिर्फ बागियों की सुनती है।', time: 45 }
        ]
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All / सभी', icon: 'Sparkles' },
  { id: 'micro_drama', label: 'Micro Drama / शॉर्ट्स', icon: 'Film' },
  { id: 'audio_story', label: 'Audio Series / ऑडियो', icon: 'Headphones' },
  { id: 'romance', label: 'Romance / इश्क', icon: 'Heart' },
  { id: 'desi_mafia', label: 'Desi Mafia / बदला', icon: 'Flame' },
  { id: 'thriller', label: 'Suspense / थ्रिलर', icon: 'ShieldAlert' },
  { id: 'horror', label: 'Horror / खौफ', icon: 'Ghost' },
  { id: 'royal', label: 'Royal / शाही', icon: 'Crown' },
];

export const DAILY_REWARDS = [
  { day: 1, coins: 20, label: 'Day 1' },
  { day: 2, coins: 30, label: 'Day 2' },
  { day: 3, coins: 50, label: 'Day 3' },
  { day: 4, coins: 70, label: 'Day 4' },
  { day: 5, coins: 100, label: 'Day 5 (Super)' },
  { day: 6, coins: 150, label: 'Day 6' },
  { day: 7, coins: 250, label: 'Day 7 (Jackpot)' },
];

export const VIP_PLANS = [
  {
    id: 'monthly',
    name: '1 Month VIP Pass',
    price: 99,
    originalPrice: 299,
    discount: '67% OFF',
    perDay: '₹3.3/day',
    popular: false,
    perks: ['All Micro Dramas Unlocked', 'Ad-Free High Definition', 'Download & Watch Offline', 'Cancel Anytime']
  },
  {
    id: 'annual',
    name: 'Annual VIP Super Pack',
    price: 299,
    originalPrice: 999,
    discount: '70% OFF',
    perDay: '₹0.8/day',
    popular: true,
    badge: 'MOST POPULAR',
    perks: ['Everything in Monthly', 'Unlimited Audio Stories', 'Early Access to New Episodes', 'VIP Member Badge', 'Dolby 3D Audio Mode']
  }
];
