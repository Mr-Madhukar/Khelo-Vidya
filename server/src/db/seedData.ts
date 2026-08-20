export interface SeedQuestion {
  question_text: string;
  question_text_odia: string;
  options: string[];
  options_odia: string[];
  correct_option: number;
  difficulty_tag: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface SeedLesson {
  title: string;
  title_odia: string;
  content_version: number;
  language: 'or' | 'en';
  content_body: Record<string, unknown>;
  media_refs: string[];
  questions: SeedQuestion[];
}

export interface SeedTopic {
  subject: string;
  grade: number;
  topic_name: string;
  topic_name_odia: string;
  order_index: number;
  lessons: SeedLesson[];
}

export const SEED_DATA: SeedTopic[] = [
  // 1. Physics - Force, Motion & Friction
  {
    subject: 'STEM - Physics',
    grade: 7,
    topic_name: 'Force, Motion & Friction',
    topic_name_odia: 'ବଳ, ଗତି ଏବଂ ଘର୍ଷଣ',
    order_index: 1,
    lessons: [
      {
        title: 'Understanding Force: Push and Pull',
        title_odia: 'ବଳର ଧାରଣା: ଠେଲା ଏବଂ ଟଣା',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Force is a push or pull upon an object resulting from its interaction with another object.',
          summaryOdia: 'ବଳ ହେଉଛି କୌଣସି ବସ୍ତୁ ଉପରେ ପ୍ରୟୋଗ କରାଯାଉଥିବା ଠେଲା ବା ଟଣା, ଯାହା ବସ୍ତୁର ଗତି ବା ଆକୃତି ବଦଳାଇପାରେ।',
          sections: [
            {
              title: 'What is Force?',
              titleOdia: 'ବଳ କ’ଣ?',
              content: 'A force is an interaction that causes an object with mass to change its velocity (moving from rest, accelerating, or changing direction). Force is measured in Newtons (N).',
              contentOdia: 'ବଳ ହେଉଛି ଏକ ବାହ୍ୟ କାରକ ଯାହା ଏକ ସ୍ଥିର ବସ୍ତୁକୁ ଗତିଶୀଳ କରିପାରେ କିମ୍ବା ଗତିଶୀଳ ବସ୍ତୁର ବେଗ ବା ଦିଗ ପରିବର୍ତ୍ତନ କରିପାରେ। ବଳର ଏକକ ହେଉଛି ନ୍ୟୁଟନ୍ (N)।',
              keyPoints: ['Forces have both magnitude and direction', 'Measured in Newtons (N)', 'Can change speed, direction, or shape of an object'],
              keyPointsOdia: ['ବଳର ପରିମାଣ ଏବଂ ଦିଗ ଉଭୟ ଥାଏ', 'ଏହାର ଏକକ ନ୍ୟୁଟନ୍ (N)', 'ଏହା ବସ୍ତୁର ଗତି, ଦିଗ ବା ଆକୃତି ବଦଳାଇପାରେ']
            },
            {
              title: 'Types of Forces: Contact vs Non-Contact',
              titleOdia: 'ବଳର ପ୍ରକାର: ସଂସ୍ପର୍ଶ ଏବଂ ଅସଂସ୍ପର୍ଶ ବଳ',
              content: 'Contact forces require physical touch (e.g., muscular force, friction). Non-contact forces act from a distance (e.g., gravitational pull of the Earth, magnetic force).',
              contentOdia: 'ଯେଉଁ ବଳ ପ୍ରୟୋଗ ପାଇଁ ସ୍ପର୍ଶ ଦରକାର ତାହା ସଂସ୍ପର୍ଶ ବଳ (ଯଥା: ମାଂସପେଶୀୟ ବଳ, ଘର୍ଷଣ)। ଦୂରରୁ କାର୍ଯ୍ୟ କରୁଥିବା ବଳ ହେଉଛି ଅସଂସ୍ପର୍ଶ ବଳ (ଯଥା: ମାଧ୍ୟାକର୍ଷଣ, ଚୁମ୍ବକୀୟ ବଳ)।',
              keyPoints: ['Muscular force & friction are contact forces', 'Gravity and magnetism are non-contact forces'],
              keyPointsOdia: ['ମାଂସପେଶୀ ବଳ ଓ ଘର୍ଷଣ ହେଉଛି ସଂସ୍ପର୍ଶ ବଳ', 'ମାଧ୍ୟାକର୍ଷଣ ଓ ଚୁମ୍ବକୀୟ ବଳ ହେଉଛି ଅସଂସ୍ପର୍ଶ ବଳ']
            }
          ],
          realWorldOdisha: {
            title: 'Odisha in Action: Pulling the Chariots of Puri',
            titleOdia: 'ଓଡ଼ିଶା ପ୍ରସଙ୍ଗ: ପୁରୀ ରଥଯାତ୍ରାରେ ରଥ ଟାଣିବା',
            context: 'During Puri Ratha Yatra, lakhs of devotees apply muscular tensile force to pull Nandighosha and the other sacred chariots over the Grand Road (Bada Danda). Friction between wooden wheels and the road stabilizes the motion.',
            contextOdia: 'ପୁରୀ ରଥଯାତ୍ରାରେ ବଡ଼ଦାଣ୍ଡରେ ଲକ୍ଷ ଲକ୍ଷ ଭକ୍ତ ମାଂସପେଶୀୟ ଟାଣିବା ବଳ ପ୍ରୟୋଗ କରି ନନ୍ଦିଘୋଷ ରଥ ଟାଣନ୍ତି। ଚକ ଏବଂ ରାସ୍ତା ମଧ୍ୟରେ ଥିବା ଘର୍ଷଣ ବଳ ଗତି ନିୟନ୍ତ୍ରଣରେ ସାହାଯ୍ୟ କରେ।'
          },
          funFact: {
            en: 'Without friction between your shoes and the ground, walking forward would be completely impossible!',
            or: 'ଆମ ଜୋତା ଓ ଭୂମି ମଧ୍ୟରେ ଘର୍ଷଣ ବଳ ନ ଥିଲେ ଆମେ ଆଗକୁ ଚାଲିବା ସମ୍ପୂର୍ଣ୍ଣ ଅସମ୍ଭବ ହୋଇପଡ଼ନ୍ତା!'
          }
        },
        media_refs: ['/media/force_puri_chariot.png'],
        questions: [
          {
            question_text: 'What is the SI unit of force?',
            question_text_odia: 'ବଳର SI ଏକକ କ’ଣ?',
            options: ['Joule', 'Newton', 'Pascal', 'Watt'],
            options_odia: ['ଜୁଲ୍', 'ନ୍ୟୁଟନ୍', 'ପାସ୍କାଲ୍', 'ୱାଟ୍'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'Which of the following is a non-contact force?',
            question_text_odia: 'ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ କେଉଁଟି ଏକ ଅସଂସ୍ପର୍ଶ ବଳ?',
            options: ['Friction', 'Muscular force', 'Gravitational force', 'Tension force'],
            options_odia: ['ଘର୍ଷଣ ବଳ', 'ମାଂସପେଶୀୟ ବଳ', 'ମାଧ୍ୟାକର୍ଷଣ ବଳ', 'ଟାଣିବା ବଳ'],
            correct_option: 2,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'When two equal forces act on an object in opposite directions, the net force is:',
            question_text_odia: 'ଯେତେବେଳେ ଏକ ବସ୍ତୁ ଉପରେ ଦୁଇଟି ସମାନ ବଳ ବିପରୀତ ଦିଗରେ ପ୍ରୟୋଗ ହୁଏ, ସେତେବେଳେ ମୋଟ ବଳ କେତେ ହୁଏ?',
            options: ['Doubled', 'Zero', 'Infinite', 'Negative'],
            options_odia: ['ଦୁଇଗୁଣ', 'ଶୂନ୍ୟ', 'ଅସୀମ', 'ଋଣାତ୍ମକ'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      },
      {
        title: 'Friction: Friend and Foe',
        title_odia: 'ଘର୍ଷଣ: ବନ୍ଧୁ ନା ଶତ୍ରୁ?',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Friction is the resistive force that opposes relative motion between two surfaces in contact.',
          summaryOdia: 'ପରସ୍ପର ସଂସ୍ପର୍ଶରେ ଥିବା ଦୁଇଟି ତଳ ମଧ୍ୟରେ ଆପେକ୍ଷିକ ଗତିକୁ ପ୍ରତିରୋଧ କରୁଥିବା ବଳକୁ ଘର୍ଷଣ କୁହାଯାଏ।',
          sections: [
            {
              title: 'Causes of Friction',
              titleOdia: 'ଘର୍ଷଣର କାରଣ',
              content: 'Friction is caused by microscopic irregularities on contacting surfaces interlocking with each other.',
              contentOdia: 'ଦୁଇଟି ତଳର ଅଣୁବୀକ୍ଷଣୀୟ ଅସମାନତା ବା ଖାଲଖମା ପରସ୍ପର ମଧ୍ୟରେ ଛନ୍ଦି ହୋଇଯିବା ଯୋଗୁଁ ଘର୍ଷଣ ସୃଷ୍ଟି ହୁଏ।',
              keyPoints: ['Rough surfaces have higher friction', 'Smooth surfaces reduce friction', 'Lubrication creates a separating film'],
              keyPointsOdia: ['ଖସଡ଼ା ନଥିବା ଖଦଡ଼ିଆ ତଳରେ ଅଧିକ ଘର୍ଷଣ ଥାଏ', 'ତେଲ ବା ତେଲିଆ ପଦାର୍ଥ ଘର୍ଷଣ କମାଇଦିଏ']
            }
          ],
          realWorldOdisha: {
            title: 'Odisha Fishermen at Chilika Lake',
            titleOdia: 'ଚିଲିକା ହ୍ରଦରେ ମତ୍ସ୍ୟଜୀବୀଙ୍କ ଡଙ୍ଗା',
            context: 'Fishermen at Chilika streamline the shape of their wooden boats to minimize water drag (fluid friction) so they glide smoothly.',
            contextOdia: 'ଚିଲିକା ହ୍ରଦର ଡଙ୍ଗାଚାଳକମାନେ ଡଙ୍ଗାର ଆଗ ଭାଗକୁ ଧାରାବାହୀ (ଷ୍ଟ୍ରିମଲାଇନ୍) ଆକୃତି ଦିଅନ୍ତି ଯାହାଦ୍ୱାରା ଜଳର ଘର୍ଷଣ କମିଯାଏ।'
          },
          funFact: {
            en: 'Ball bearings inside bicycle wheels replace sliding friction with rolling friction, making pedaling 90% easier!',
            or: 'ସାଇକେଲ୍ ଚକରେ ଥିବା ବଲ୍-ବେୟାରିଂ ସ୍ଲାଇଡିଂ ଘର୍ଷଣକୁ ଗଡ଼ନ୍ତା ଘର୍ଷଣରେ ବଦଳାଇ ଦିଏ!'
          }
        },
        media_refs: ['/media/friction_boat.png'],
        questions: [
          {
            question_text: 'Which type of friction is the smallest in magnitude?',
            question_text_odia: 'ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ କେଉଁ ଘର୍ଷଣ ସବୁଠାରୁ କମ୍?',
            options: ['Static friction', 'Sliding friction', 'Rolling friction', 'Fluid drag'],
            options_odia: ['ସ୍ଥିତିକ ଘର୍ଷଣ', 'ସର୍ପଣ ଘର୍ଷଣ', 'ଆବର୍ତ୍ତନ (ଗଡ଼ନ୍ତା) ଘର୍ଷଣ', 'ତରଳ ଘର୍ଷଣ'],
            correct_option: 2,
            difficulty_tag: 'medium',
            points: 15
          },
          {
            question_text: 'What do lubricants do to friction between machine parts?',
            question_text_odia: 'ଯନ୍ତ୍ରାଂଶ ମଧ୍ୟରେ ଲୁବ୍ରିକାଣ୍ଟ (ତେଲ) ପ୍ରୟୋଗ କଲେ ଘର୍ଷଣ କ’ଣ ହୁଏ?',
            options: ['Increases it', 'Reduces it', 'Eliminates gravity', 'Freezes motion'],
            options_odia: ['ବଢ଼ିଯାଏ', 'କମିଯାଏ', 'ଗୁରୁତ୍ୱାକର୍ଷଣ ନଷ୍ଟ ହୁଏ', 'ଗତି ବନ୍ଦ ହୁଏ'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'Why do athletes use spiked shoes on running tracks?',
            question_text_odia: 'ଧାବକମାନେ କାହିଁକି କଣ୍ଟା ଥିବା ଜୋତା (ସ୍ପାଇକ୍ସ) ପିନ୍ଧନ୍ତି?',
            options: ['To reduce shoe weight', 'To increase friction and prevent slipping', 'To absorb sweat', 'To look stylish'],
            options_odia: ['ଜୋତାର ଓଜନ କମାଇବା ପାଇଁ', 'ଘର୍ଷଣ ବୃଦ୍ଧି କରି ଖସିପଡ଼ିବାକୁ ରୋକିବା ପାଇଁ', 'ଝାଳ ଶୋଷିବା ପାଇଁ', 'ସୁନ୍ଦର ଦେଖାଯିବା ପାଇଁ'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      }
    ]
  },

  // 2. Physics - Light, Reflection & Mirrors
  {
    subject: 'STEM - Physics',
    grade: 7,
    topic_name: 'Light, Shadows & Optical Reflection',
    topic_name_odia: 'ଆଲୋକ, ଛାଇ ଏବଂ ପ୍ରତିଫଳନ',
    order_index: 2,
    lessons: [
      {
        title: 'Reflection of Light and Plane Mirrors',
        title_odia: 'ଆଲୋକର ପ୍ରତିଫଳନ ଏବଂ ସମତଳ ଦର୍ପଣ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Light travels in straight lines and bounces off shiny surfaces following the laws of reflection.',
          summaryOdia: 'ଆଲୋକ ସର୍ବଦା ସରଳ ରେଖାରେ ଗତି କରେ ଏବଂ ଚିକ୍କଣ ପୃଷ୍ଠରେ ପଡ଼ି ପ୍ରତିଫଳିତ ହୁଏ।',
          sections: [
            {
              title: 'Laws of Reflection',
              titleOdia: 'ପ୍ରତିଫଳନର ନିୟମାବଳୀ',
              content: '1. The incident ray, the reflected ray, and the normal at the point of incidence all lie in the same plane.\n2. The angle of incidence (∠i) is always equal to the angle of reflection (∠r).',
              contentOdia: '୧. ଆପତିତ ରଶ୍ମି, ପ୍ରତିଫଳିତ ରଶ୍ମି ଏବଂ ଆପତନ ବିନ୍ଦୁରେ ଅଙ୍କିତ ଅଭିଲମ୍ବ ଏକ ସମତଳରେ ରହନ୍ତି।\n୨. ଆପତନ କୋଣ (∠i) ସର୍ବଦା ପ୍ରତିଫଳନ କୋଣ (∠r) ସହିତ ସମାନ ହୋଇଥାଏ।',
              keyPoints: ['Angle of incidence = Angle of reflection', 'Images in plane mirrors are virtual, erect, and laterally inverted'],
              keyPointsOdia: ['ଆପତନ କୋଣ = ପ୍ରତିଫଳନ କୋଣ', 'ସମତଳ ଦର୍ପଣରେ ପ୍ରତିବିମ୍ବ ଆଭାସୀ, ସଳଖ ଏବଂ ପାର୍ଶ୍ୱ ପରିବର୍ତ୍ତିତ ହୁଏ']
            }
          ],
          realWorldOdisha: {
            title: 'Konark Sun Temple & Astronomical Alignment',
            titleOdia: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ଏବଂ ସୂର୍ଯ୍ୟକିରଣର ଜ୍ୟାମିତି',
            context: 'The 13th-century Konark Sun Temple was engineered so that the first rays of dawn struck the central deity in the sanctum sanctorum through precise optical alignment.',
            contextOdia: 'ତ୍ରୟୋଦଶ ଶତାବ୍ଦୀର ବିଶ୍ୱପ୍ରସିଦ୍ଧ କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ଏପରି ଭାବରେ ନିର୍ମିତ ହୋଇଥିଲା ଯେ ପ୍ରଭାତର ପ୍ରଥମ ସୂର୍ଯ୍ୟକିରଣ ସିଧାସଳଖ ଗର୍ଭଗୃହର ପ୍ରତିମା ଉପରେ ପଡୁଥିଲା।'
          },
          funFact: {
            en: 'In a plane mirror, your right hand appears as your left hand in the reflection. This is called lateral inversion!',
            or: 'ଆଇନାରେ ତୁମର ଡାହାଣ ହାତ ବାମ ହାତ ଭଳି ଦେଖାଯାଏ, ଏହାକୁ ପାର୍ଶ୍ୱୀୟ ବିପରୀତତା କୁହାଯାଏ!'
          }
        },
        media_refs: ['/media/light_konark.png'],
        questions: [
          {
            question_text: 'If a ray of light strikes a mirror at an angle of incidence of 35°, what is the angle of reflection?',
            question_text_odia: 'ଯଦି ଆଲୋକ ରଶ୍ମି ୩୫° ଆପତନ କୋଣରେ ଏକ ଦର୍ପଣ ଉପରେ ପଡ଼େ, ତେବେ ପ୍ରତିଫଳନ କୋଣ କେତେ ହେବ?',
            options: ['0°', '35°', '70°', '90°'],
            options_odia: ['୦°', '୩୫°', '୭୦°', '୯୦°'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'Which mirror is commonly used as a rear-view mirror in vehicles?',
            question_text_odia: 'ଗାଡ଼ିର ପଛପଟ ଦେଖିବା ପାଇଁ (ରିଅର୍-ଭ୍ୟୁ ମିରର୍) କେଉଁ ଦର୍ପଣ ବ୍ୟବହୃତ ହୁଏ?',
            options: ['Concave mirror', 'Convex mirror', 'Plane mirror', 'Cylindrical mirror'],
            options_odia: ['ଅବତଳ ଦର୍ପଣ', 'ଉତ୍ତଳ ଦର୍ପଣ', 'ସମତଳ ଦର୍ପଣ', 'ବେଳଣାକାର ଦର୍ପଣ'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          },
          {
            question_text: 'The splitting of white light into its seven component colors is known as:',
            question_text_odia: 'ଧଳା ଆଲୋକ ସାତୋଟି ରଙ୍ଗରେ ବିଭାଜିତ ହେବା ପ୍ରକ୍ରିୟାକୁ କ’ଣ କୁହାଯାଏ?',
            options: ['Diffraction', 'Dispersion', 'Absorption', 'Total Internal Reflection'],
            options_odia: ['ବିବର୍ତ୍ତନ', 'ବିଚ୍ଛୁରଣ (Dispersion)', 'ଅବଶୋଷଣ', 'ପୂର୍ଣ୍ଣ ଆଭ୍ୟନ୍ତରୀଣ ପ୍ରତିଫଳନ'],
            correct_option: 1,
            difficulty_tag: 'hard',
            points: 20
          }
        ]
      },
      {
        title: 'Spherical Mirrors: Concave and Convex',
        title_odia: 'ଗୋଲକୀୟ ଦର୍ପଣ: ଅବତଳ ଏବଂ ଉତ୍ତଳ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Spherical mirrors have curved reflecting surfaces that can converge or diverge light rays.',
          summaryOdia: 'ଗୋଲକୀୟ ଦର୍ପଣର ପ୍ରତିଫଳକ ପୃଷ୍ଠ ବକ୍ର ହୋଇଥାଏ, ଯାହା ଆଲୋକକୁ କେନ୍ଦ୍ରୀଭୂତ ବା ବିକେନ୍ଦ୍ରୀଭୂତ କରିପାରେ।',
          sections: [
            {
              title: 'Concave vs Convex Mirrors',
              titleOdia: 'ଅବତଳ ବନାମ ଉତ୍ତଳ ଦର୍ପଣ',
              content: 'A concave mirror curves inward and focuses parallel rays to a single focal point (used by dentists and in solar cookers). A convex mirror curves outward and gives a wider field of view.',
              contentOdia: 'ଅବତଳ ଦର୍ପଣ ଭିତରକୁ ବକ୍ର ହୋଇ ଆଲୋକକୁ ଏକତ୍ରିତ କରେ (ଦାନ୍ତ ଡାକ୍ତର ବ୍ୟବହାର କରନ୍ତି)। ଉତ୍ତଳ ଦର୍ପଣ ବାହାରକୁ ବକ୍ର ହୋଇ ବିସ୍ତୃତ ଅଞ୍ଚଳ ଦେଖାଇବାରେ ସାହାଯ୍ୟ କରେ।',
              keyPoints: ['Concave mirrors can form real and inverted or virtual magnified images', 'Convex mirrors always form diminished, erect, virtual images'],
              keyPointsOdia: ['ଅବତଳ ଦର୍ପଣ ବାସ୍ତବ ଏବଂ ବଡ଼ ପ୍ରତିବିମ୍ବ ଗଠନ କରିପାରେ', 'ଉତ୍ତଳ ଦର୍ପଣ ସର୍ବଦା ଛୋଟ, ସଳଖ ଏବଂ ଆଭାସୀ ପ୍ରତିବିମ୍ବ ଗଠନ କରେ']
            }
          ],
          realWorldOdisha: {
            title: 'Solar Cookers in Rural Odisha',
            titleOdia: 'ଓଡ଼ିଶାର ଗ୍ରାମାଞ୍ଚଳରେ ସୌର ଚୁଲା',
            context: 'In rural districts like Mayurbhanj, concave reflectors are used in solar cooking units to concentrate sunlight onto cooking pots without burning firewood.',
            contextOdia: 'ମୟୂରଭଞ୍ଜ ପରି ଜିଲ୍ଲାରେ ଅବତଳ ଦର୍ପଣ ବ୍ୟବହାର କରି ସୂର୍ଯ୍ୟାଲୋକକୁ କେନ୍ଦ୍ରୀଭୂତ କରି ଜାଳେଣି କାଠ ବିନା ରନ୍ଧନ କାର୍ଯ୍ୟ କରାଯାଉଛି।'
          },
          funFact: {
            en: 'The inside surface of a shiny metal spoon acts as a concave mirror, while the back surface acts as a convex mirror!',
            or: 'ଏକ ଚିକ୍କଣ ଷ୍ଟିଲ୍ ଚାମଚର ଭିତର ପାଖ ଅବତଳ ଦର୍ପଣ ଏବଂ ପଛ ପାଖ ଉତ୍ତଳ ଦର୍ପଣ ଭଳି କାମ କରେ!'
          }
        },
        media_refs: ['/media/solar_cooker_mirror.png'],
        questions: [
          {
            question_text: 'Dentists use which type of mirror to examine enlarged images of teeth?',
            question_text_odia: 'ଦନ୍ତ ଚିକିତ୍ସକ ଦାନ୍ତର ବଡ଼ ପ୍ରତିବିମ୍ବ ଦେଖିବା ପାଇଁ କେଉଁ ଦର୍ପଣ ବ୍ୟବହାର କରନ୍ତି?',
            options: ['Convex mirror', 'Concave mirror', 'Plane mirror', 'Double convex lens'],
            options_odia: ['ଉତ୍ତଳ ଦର୍ପଣ', 'ଅବତଳ ଦର୍ପଣ', 'ସମତଳ ଦର୍ପଣ', 'ଉଭୟୋତ୍ତଳ ଲେନ୍ସ'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'What type of image is ALWAYS formed by a convex mirror?',
            question_text_odia: 'ଉତ୍ତଳ ଦର୍ପଣ ଦ୍ୱାରା ସର୍ବଦା କେଉଁ ପ୍ରକାରର ପ୍ରତିବିମ୍ବ ସୃଷ୍ଟି ହୁଏ?',
            options: ['Real, inverted and enlarged', 'Virtual, erect and diminished', 'Real, erect and same size', 'Virtual, inverted and enlarged'],
            options_odia: ['ବାସ୍ତବ, ଓଲଟା ଓ ବଡ଼', 'ଆଭାସୀ, ସଳଖ ଓ ଛୋଟ', 'ବାସ୍ତବ, ସଳଖ ଓ ସମାନ ଆକାର', 'ଆଭାସୀ, ଓଲଟା ଓ ବଡ଼'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      }
    ]
  },

  // 3. Chemistry - Acids, Bases & Indicators
  {
    subject: 'STEM - Chemistry',
    grade: 7,
    topic_name: 'Acids, Bases & Natural Indicators',
    topic_name_odia: 'ଅମ୍ଳ, କ୍ଷାରକ ଏବଂ ପ୍ରାକୃତିକ ସୂଚକ',
    order_index: 3,
    lessons: [
      {
        title: 'Acids and Bases in Daily Life',
        title_odia: 'ଦୈନନ୍ଦିନ ଜୀବନରେ ଅମ୍ଳ ଏବଂ କ୍ଷାରକ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Acids taste sour and turn blue litmus red. Bases taste bitter, feel soapy, and turn red litmus blue.',
          summaryOdia: 'ଅମ୍ଳ ଖଟା ସ୍ୱାଦଯୁକ୍ତ ଏବଂ ନୀଳ ଲିଟମସକୁ ନାଲି କରେ। କ୍ଷାରକ ପିତା ସ୍ୱାଦଯୁକ୍ତ ଏବଂ ନାଲି ଲିଟମସକୁ ନୀଳ କରେ।',
          sections: [
            {
              title: 'Properties of Acids and Bases',
              titleOdia: 'ଅମ୍ଳ ଓ କ୍ଷାରକର ଧର୍ମ',
              content: 'Natural acids include citric acid in lemons and lactic acid in curd. Common bases include sodium hydroxide in soaps and calcium hydroxide in slaked lime.',
              contentOdia: 'ପ୍ରାକୃତିକ ଅମ୍ଳ: ଲେମ୍ବୁରେ ଥିବା ସାଇଟ୍ରିକ୍ ଏସିଡ୍, ଦହିରେ ଥିବା ଲାକ୍ଟିକ୍ ଏସିଡ୍। ସାଧାରଣ କ୍ଷାରକ: ସାବୁନରେ ଥିବା ସୋଡ଼ିୟମ୍ ହାଇଡ୍ରକ୍ସାଇଡ୍, ଚୂନ ପାଣିରେ ଥିବା କ୍ୟାଲସିୟମ୍ ହାଇଡ୍ରକ୍ସାଇଡ୍।',
              keyPoints: ['Acids: pH < 7, sour taste, turn blue litmus red', 'Bases: pH > 7, bitter taste, soapy touch, turn red litmus blue'],
              keyPointsOdia: ['ଅମ୍ଳ: pH < ୭, ଖଟା ସ୍ୱାଦ, ନୀଳ ଲିଟମସ୍ ନାଲି ହୁଏ', 'କ୍ଷାରକ: pH > ୭, ପିତା ସ୍ୱାଦ, ନାଲି ଲିଟମସ୍ ନୀଳ ହୁଏ']
            }
          ],
          realWorldOdisha: {
            title: 'Odisha Pakhala & Turmeric Indicator',
            titleOdia: 'ଓଡ଼ିଶାର ପଖାଳ ଓ ହଳଦୀ ସୂଚକ',
            context: 'When sour curd (lactic acid) is added to Odisha Pakhala, it lowers pH. If you spill turmeric on clothes and wash with alkaline soap, the yellow stain turns bright red!',
            contextOdia: 'ହଳଦୀ ଏକ ପ୍ରାକୃତିକ ସୂଚକ। ଲୁଗାରେ ହଳଦୀ ଦାଗ ଲାଗିଲେ ସାବୁନ (କ୍ଷାରୀୟ) ଲଗାଇଲେ ତାହା ଲାଲ୍ ରଙ୍ଗ ହୋଇଯାଏ।'
          },
          funFact: {
            en: 'Ant stings contain formic acid. Applying baking soda paste (a mild base) neutralizes the sting immediately!',
            or: 'ପିମ୍ପୁଡ଼ି କାମୁଡ଼ିଲେ ଫର୍ମିକ୍ ଏସିଡ୍ ନିର୍ଗତ ହୁଏ। ବେକିଂ ସୋଡ଼ା (କ୍ଷାରକ) ଲଗାଇଲେ ଏହା ପ୍ରଶମିତ ହୋଇ ଯନ୍ତ୍ରଣା କମିଯାଏ!'
          }
        },
        media_refs: ['/media/acid_base_litmus.png'],
        questions: [
          {
            question_text: 'Which acid is present in curd/yogurt?',
            question_text_odia: 'ଦହିରେ କେଉଁ ଏସିଡ୍ ଥାଏ?',
            options: ['Acetic acid', 'Lactic acid', 'Citric acid', 'Oxalic acid'],
            options_odia: ['ଏସିଟିକ୍ ଏସିଡ୍', 'ଲାକ୍ଟିକ୍ ଏସିଡ୍', 'ସାଇଟ୍ରିକ୍ ଏସିଡ୍', 'ଅକ୍ସାଲିକ୍ ଏସିଡ୍'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'What happens when a drop of soap solution is added to a turmeric paste paper strip?',
            question_text_odia: 'ହଳଦୀ କାଗଜ ଉପରେ ସାବୁନ ପାଣି ଢାଳିଲେ ରଙ୍ଗ କିପରି ବଦଳେ?',
            options: ['Remains yellow', 'Turns blue', 'Turns reddish-brown', 'Turns green'],
            options_odia: ['ହଳଦିଆ ରହେ', 'ନୀଳ ହୁଏ', 'ଲାଲ୍-ବାଦାମୀ ହୁଏ', 'ସବୁଜ ହୁଏ'],
            correct_option: 2,
            difficulty_tag: 'medium',
            points: 15
          },
          {
            question_text: 'The reaction between an acid and a base to form salt and water is called:',
            question_text_odia: 'ଅମ୍ଳ ଏବଂ କ୍ଷାରକ ମଧ୍ୟରେ ପ୍ରତିକ୍ରିୟା ଘଟି ଲବଣ ଓ ଜଳ ସୃଷ୍ଟି ହେବାକୁ କ’ଣ କୁହାଯାଏ?',
            options: ['Neutralization', 'Oxidation', 'Fermentation', 'Distillation'],
            options_odia: ['ପ୍ରଶମନ (Neutralization)', 'ଜାରଣ', 'କିଣ୍ୱନ', 'ପରିସ୍ରବଣ'],
            correct_option: 0,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      },
      {
        title: 'Neutralization and Soil Treatment',
        title_odia: 'ପ୍ରଶମନ ପ୍ରକ୍ରିୟା ଏବଂ ମୃତ୍ତିକା ସଂଶୋଧନ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Neutralization is the reaction between an acid and a base, producing salt, water, and heat.',
          summaryOdia: 'ଅମ୍ଳ ଏବଂ କ୍ଷାରକ ମିଶି ପରସ୍ପରର ପ୍ରଭାବକୁ ନଷ୍ଟ କରି ଲବଣ ଓ ଜଳ ସୃଷ୍ଟି କରିବା ପ୍ରକ୍ରିୟାକୁ ପ୍ରଶମନ କୁହାଯାଏ।',
          sections: [
            {
              title: 'Treating Acidic Agricultural Soil',
              titleOdia: 'ଅମ୍ଳୀୟ କୃଷି ମୃତ୍ତିକାର ଉପଚାର',
              content: 'Excessive use of chemical fertilizers makes soil acidic. Farmers treat acidic soil with quicklime (calcium oxide) or slaked lime (calcium hydroxide) to restore optimal fertility.',
              contentOdia: 'ରାସାୟନିକ ସାରର ଅତ୍ୟଧିକ ପ୍ରୟୋଗ ମାଟିକୁ ଅମ୍ଳୀୟ କରିଦିଏ। ଚାଷୀମାନେ ପୋଡ଼ାଚୂନ (କ୍ୟାଲସିୟମ୍ ଅକ୍ସାଇଡ୍) ପ୍ରୟୋଗ କରି ମାଟିକୁ ପ୍ରଶମିତ କରନ୍ତି।',
              keyPoints: ['Acid + Base → Salt + Water + Heat', 'Quicklime neutralizes acidic agricultural soil', 'Antacids neutralize excess stomach acid'],
              keyPointsOdia: ['ଅମ୍ଳ + କ୍ଷାରକ → ଲବଣ + ଜଳ + ତାପ', 'ଚୂନ ଅମ୍ଳୀୟ ମାଟିକୁ ସନ୍ତୁଳିତ କରେ', 'ଆଣ୍ଟାସିଡ୍ ପେଟର ଗ୍ୟାସିକ ଏସିଡିଟି କମାଏ']
            }
          ],
          realWorldOdisha: {
            title: 'Odisha Coastal Saline & Acidic Soils',
            titleOdia: 'ଓଡ଼ିଶାର ଉପକୂଳବର୍ତ୍ତୀ ମାଟିର ପରୀକ୍ଷା',
            context: 'Agricultural Extension Officers across Balasore and Bhadrak guide paddy farmers to test soil pH and apply lime to acidic soils for bumper rice harvests.',
            contextOdia: 'ବାଲେଶ୍ୱର ଓ ଭଦ୍ରକର କୃଷି ବିଭାଗ ଧାନ ଚାଷୀମାନଙ୍କୁ ମାଟିର pH ମାପି ଚୂନ ପ୍ରୟୋଗ କରିବା ପାଇଁ ପରାମର୍ଶ ଦିଅନ୍ତି।'
          },
          funFact: {
            en: 'Milk of Magnesia (magnesium hydroxide) is a mild base used as an antacid to relieve stomach heartburn!',
            or: 'ମିଲ୍କ ଅଫ୍ ମ୍ୟାଗ୍ନେସିଆ ଏକ ମୃଦୁ କ୍ଷାରକ ଯାହା ପେଟର ଏସିଡିଟି ଦୂର କରିବା ପାଇଁ ବ୍ୟବହୃତ ହୁଏ!'
          }
        },
        media_refs: ['/media/soil_ph_neutralization.png'],
        questions: [
          {
            question_text: 'What should be added to soil that has become too acidic?',
            question_text_odia: 'ଅତ୍ୟଧିକ ଅମ୍ଳୀୟ ହୋଇଥିବା ମାଟିରେ କ’ଣ ପ୍ରୟୋଗ କରାଯାଏ?',
            options: ['Organic compost', 'Quicklime or slaked lime', 'Dilute vinegar', 'Common salt'],
            options_odia: ['ଜୈବିକ ଖତ', 'ପୋଡ଼ାଚୂନ ବା ଚୂନ ପାଣି', 'ଭିନେଗାର୍', 'ଖାଇବା ଲୁଣ'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          },
          {
            question_text: 'Which substance is used as an antacid tablet?',
            question_text_odia: 'ଏସିଡିଟିରୁ ମୁକ୍ତି ପାଇବା ପାଇଁ ଆଣ୍ଟାସିଡ୍ ଔଷଧରେ କ’ଣ ଥାଏ?',
            options: ['Hydrochloric acid', 'Magnesium hydroxide', 'Sodium chloride', 'Sulfuric acid'],
            options_odia: ['ହାଇଡ୍ରୋକ୍ଲୋରିକ୍ ଏସିଡ୍', 'ମ୍ୟାଗ୍ନେସିୟମ୍ ହାଇଡ୍ରକ୍ସାଇଡ୍', 'ସୋଡ଼ିୟମ୍ କ୍ଲୋରାଇଡ୍', 'ସଲଫ୍ୟୁରିକ୍ ଏସିଡ୍'],
            correct_option: 1,
            difficulty_tag: 'hard',
            points: 20
          }
        ]
      }
    ]
  },

  // 4. Chemistry - Physical and Chemical Changes
  {
    subject: 'STEM - Chemistry',
    grade: 7,
    topic_name: 'Physical and Chemical Changes',
    topic_name_odia: 'ଭୌତିକ ଏବଂ ରାସାୟନିକ ପରିବର୍ତ୍ତନ',
    order_index: 4,
    lessons: [
      {
        title: 'Reversible vs Irreversible Changes',
        title_odia: 'ପ୍ରତ୍ୟାବର୍ତ୍ତୀ ଏବଂ ଅପ୍ରତ୍ୟାବର୍ତ୍ତୀ ପରିବର୍ତ୍ତନ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Physical changes alter state or appearance without forming new substances. Chemical changes form completely new substances with different chemical properties.',
          summaryOdia: 'ଭୌତିକ ପରିବର୍ତ୍ତନରେ କୌଣସି ନୂତନ ପଦାର୍ଥ ସୃଷ୍ଟି ହୁଏନାହିଁ। ରାସାୟନିକ ପରିବର୍ତ୍ତନରେ ନୂତନ ଗୁଣଯୁକ୍ତ ପଦାର୍ଥ ସୃଷ୍ଟି ହୁଏ।',
          sections: [
            {
              title: 'Indicators of a Chemical Reaction',
              titleOdia: 'ରାସାୟନିକ ପ୍ରତିକ୍ରିୟାର ଲକ୍ଷଣ',
              content: 'Signs of chemical changes include gas evolution, color change, temperature change (heat absorption or release), or precipitate formation.',
              contentOdia: 'ଗ୍ୟାସ୍ ଉତ୍ପନ୍ନ ହେବା, ରଙ୍ଗ ପରିବର୍ତ୍ତନ, ତାପମାତ୍ରା ବୃଦ୍ଧି ବା ହ୍ରାସ, ଏବଂ ଅବକ୍ଷେପ ସୃଷ୍ଟି ହେବା ରାସାୟନିକ ପରିବର୍ତ୍ତନର ମୁଖ୍ୟ ଲକ୍ଷଣ।',
              keyPoints: ['Melting of ice is a physical change (reversible)', 'Rusting of iron and burning of wood are chemical changes (irreversible)'],
              keyPointsOdia: ['ବରଫ ତରଳିବା ଭୌତିକ ପରିବର୍ତ୍ତନ', 'ଲୁହାରେ କଳଙ୍କି ଲାଗିବା ଏବଂ କାଠ ଜଳିବା ରାସାୟନିକ ପରିବର୍ତ୍ତନ']
            }
          ],
          realWorldOdisha: {
            title: 'Rourkela Steel Plant & Iron Rusting',
            titleOdia: 'ରାଉରକେଲା ଇସ୍ପାତ କାରଖାନା ଓ କଳଙ୍କି ନିବାରଣ',
            context: 'At Rourkela Steel Plant in Odisha, steel sheets are galvanized (coated with zinc) to prevent iron from reacting with moist air and rusting.',
            contextOdia: 'ରାଉରକେଲା ଇସ୍ପାତ କାରଖାନାରେ ଲୁହାକୁ କଳଙ୍କିରୁ ରକ୍ଷା କରିବା ପାଇଁ ଜିଙ୍କ୍ (ଦସ୍ତା)ର ପ୍ରଲେପ (ଗାଲଭାନାଇଜେସନ୍) ଦିଆଯାଏ।'
          },
          funFact: {
            en: 'The Ashoka Pillar in India has resisted rusting for over 1600 years due to a protective high-phosphorus iron passive layer!',
            or: 'ଭାରତର ଐତିହାସିକ ଲୌହ ସ୍ତମ୍ଭରେ ବିଶେଷ ଫସଫରସ୍ ପ୍ରଲେପ ଥିବାରୁ ଏହା ୧୬୦୦ ବର୍ଷ ଧରି ବିନା କଳଙ୍କିରେ ଠିଆ ହୋଇଛି!'
          }
        },
        media_refs: ['/media/rusting_galvanization.png'],
        questions: [
          {
            question_text: 'Which of the following is a chemical change?',
            question_text_odia: 'ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ କେଉଁଟି ଏକ ରାସାୟନିକ ପରିବର୍ତ୍ତନ?',
            options: ['Melting of wax', 'Boiling of water', 'Rusting of iron', 'Dissolving sugar in water'],
            options_odia: ['ମହମ ତରଳିବା', 'ପାଣି ଫୁଟିବା', 'ଲୁହାରେ କଳଙ୍କି ଲାଗିବା', 'ପାଣିରେ ଚିନି ମିଳାଇବା'],
            correct_option: 2,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'The process of depositing a thin layer of zinc on iron to prevent rusting is called:',
            question_text_odia: 'ଲୁହାକୁ କଳଙ୍କିରୁ ରକ୍ଷା କରିବା ପାଇଁ ଜିଙ୍କ୍ ପ୍ରଲେପ ଦେବା ପଦ୍ଧତିକୁ କ’ଣ କୁହାଯାଏ?',
            options: ['Crystallization', 'Galvanization', 'Neutralization', 'Sedimentation'],
            options_odia: ['ସ୍ଫଟିକୀକରଣ', 'ଗାଲଭାନାଇଜେସନ୍', 'ପ୍ରଶମନ', 'ଅବକ୍ଷେପଣ'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          },
          {
            question_text: 'When magnesium ribbon burns in air, it forms white powder called:',
            question_text_odia: 'ମ୍ୟାଗ୍ନେସିୟମ୍ ଫିତା ବାୟୁରେ ଜଳିଲେ ସୃଷ୍ଟି ହେଉଥିବା ଧଳା ପାଉଁଶକୁ କ’ଣ କୁହାଯାଏ?',
            options: ['Magnesium carbonate', 'Magnesium oxide', 'Magnesium chloride', 'Magnesium nitrate'],
            options_odia: ['ମ୍ୟାଗ୍ନେସିୟମ୍ କାର୍ବୋନେଟ୍', 'ମ୍ୟାଗ୍ନେସିୟମ୍ ଅକ୍ସାଇଡ୍', 'ମ୍ୟାଗ୍ନେସିୟମ୍ କ୍ଲୋରାଇଡ୍', 'ମ୍ୟାଗ୍ନେସିୟମ୍ ନାଇଟ୍ରେଟ୍'],
            correct_option: 1,
            difficulty_tag: 'hard',
            points: 20
          }
        ]
      },
      {
        title: 'Crystallization: Pure Substance Extraction',
        title_odia: 'ସ୍ଫଟିକୀକରଣ: ବିଶୁଦ୍ଧ ପଦାର୍ଥ ନିଷ୍କାସନ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Crystallization is a physical purification method where large crystals of a pure substance are obtained from its saturated solution.',
          summaryOdia: 'ସ୍ଫଟିକୀକରଣ ଏକ ଭୌତିକ ପଦ୍ଧତି ଯାହାଦ୍ୱାରା ଏକ ପରିପୃକ୍ତ ଦ୍ରବଣରୁ ବିଶୁଦ୍ଧ ସ୍ଫଟିକ ପ୍ରସ୍ତୁତ କରାଯାଏ।',
          sections: [
            {
              title: 'How Crystallization Works',
              titleOdia: 'ସ୍ଫଟିକୀକରଣ ପ୍ରଣାଳୀ',
              content: 'Copper sulphate solution is heated with a few drops of dilute sulphuric acid until saturated, then cooled slowly without disturbance to form bright blue crystals.',
              contentOdia: 'କପର ସଲଫେଟ୍ ଦ୍ରବଣକୁ ଫୁଟାଇ ପରିପୃକ୍ତ କରି ଧୀରେ ଧୀରେ ଥଣ୍ଡା କଲେ ଉଜ୍ଜ୍ୱଳ ନୀଳ ରଙ୍ଗର ସ୍ଫଟିକ ସୃଷ୍ଟି ହୁଏ।',
              keyPoints: ['Physical process (no chemical reaction occurs)', 'Used to purify solids from impure mixtures'],
              keyPointsOdia: ['ଏହା ଏକ ଭୌତିକ ପ୍ରକ୍ରିୟା', 'କଠିନ ପଦାର୍ଥକୁ ବିଶୁଦ୍ଧ କରିବା ପାଇଁ ବ୍ୟବହୃତ']
            }
          ],
          realWorldOdisha: {
            title: 'Salt Farming in Ganjam (Huma Salt Fields)',
            titleOdia: 'ଗଞ୍ଜାମ ହୁମ୍ମା ଲୁଣ ଚାଷ',
            context: 'Along the coast of Ganjam at Huma, sea water trapped in shallow salt pans evaporates under the tropical sun, crystallizing into natural sea salt.',
            contextOdia: 'ଗଞ୍ଜାମର ହୁମ୍ମା ଉପକୂଳରେ ସମୁଦ୍ର ପାଣିକୁ ବାଷ୍ପୀଭୂତ କରି ପ୍ରାକୃତିକ ସ୍ଫଟିକୀକରଣ ଦ୍ୱାରା ଲୁଣ ଉତ୍ପାଦନ କରାଯାଏ।'
          },
          funFact: {
            en: 'Snowflakes are natural water ice crystals, and every single snowflake has a unique hexagonal symmetry!',
            or: 'ତୁଷାରପାତ ସମୟରେ ପଡୁଥିବା ପ୍ରତ୍ୟେକ ତୁଷାରକଣିକା (Snowflake) ହେଉଛି ଜଳର ଷଡ଼ଭୁଜାକାର ସ୍ଫଟିକ!'
          }
        },
        media_refs: ['/media/salt_crystallization.png'],
        questions: [
          {
            question_text: 'Crystallization is an example of which kind of process?',
            question_text_odia: 'ସ୍ଫଟିକୀକରଣ କେଉଁ ପ୍ରକାରର ପଦ୍ଧତି?',
            options: ['Chemical synthesis', 'Physical purification', 'Biological decomposition', 'Nuclear reaction'],
            options_odia: ['ରାସାୟନିକ ସଂଶ୍ଳେଷଣ', 'ଭୌତିକ ବିଶୁଦ୍ଧିକରଣ', 'ଜୈବିକ ବିଘଟନ', 'ନାଭିକୀୟ ପ୍ରତିକ୍ରିୟା'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'What is the color of pure copper sulphate crystals?',
            question_text_odia: 'ବିଶୁଦ୍ଧ କପର ସଲଫେଟ୍ ସ୍ଫଟିକର ରଙ୍ଗ କ’ଣ?',
            options: ['Bright Red', 'Sky Blue', 'Emerald Green', 'Deep Black'],
            options_odia: ['ଉଜ୍ଜ୍ୱଳ ଲାଲ୍', 'ଉଜ୍ଜ୍ୱଳ ନୀଳ', 'ସବୁଜ', 'କଳା'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      }
    ]
  },

  // 5. Biology - Nutrition in Plants & Photosynthesis
  {
    subject: 'STEM - Biology',
    grade: 7,
    topic_name: 'Plant Nutrition & Photosynthesis',
    topic_name_odia: 'ଉଦ୍ଭିଦରେ ପୋଷଣ ଏବଂ ଆଲୋକସଂଶ୍ଳେଷଣ',
    order_index: 5,
    lessons: [
      {
        title: 'Autotrophic Nutrition & Chlorophyll',
        title_odia: 'ସ୍ୱଭୋଜୀ ପୋଷଣ ଏବଂ ହରିତ୍ କଣିକା',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Green plants synthesize their own food using sunlight, water, carbon dioxide, and chlorophyll through photosynthesis.',
          summaryOdia: 'ସବୁଜ ଉଦ୍ଭିଦମାନେ ସୂର୍ଯ୍ୟାଲୋକ, ଜଳ, ଅଙ୍ଗାରକାମ୍ଳ ଏବଂ ହରିତ୍‌କଣିକା ସାହାଯ୍ୟରେ ନିଜ ଖାଦ୍ୟ ନିଜେ ପ୍ରସ୍ତୁତ କରନ୍ତି।',
          sections: [
            {
              title: 'Photosynthesis Equation',
              titleOdia: 'ଆଲୋକସଂଶ୍ଳେଷଣର ରାସାୟନିକ ସମୀକରଣ',
              content: 'Carbon dioxide + Water + Sunlight (Chlorophyll) → Glucose (Carbohydrate) + Oxygen gas.',
              contentOdia: 'ଅଙ୍ଗାରକାମ୍ଳ (CO₂) + ଜଳ (H₂O) + ସୂର୍ଯ୍ୟାଲୋକ (ହରିତକଣା) → ଶର୍କରା (ଗ୍ଲୁକୋଜ୍) + ଅମ୍ଳଜାନ (O₂)।',
              keyPoints: ['Leaves are the food factories of plants', 'Stomata allow gas exchange (CO2 in, O2 out)', 'Chlorophyll captures solar radiation'],
              keyPointsOdia: ['ପତ୍ର ହେଉଛି ଉଦ୍ଭିଦର ରୋଷେଇଶାଳା', 'ଷ୍ଟୋମାଟା (ସ୍ତୋମ) ଦ୍ୱାରା ବାୟୁ ବିନିମୟ ହୁଏ', 'କ୍ଲୋରୋଫିଲ୍ ସୌରଶକ୍ତି ଗ୍ରହଣ କରେ']
            }
          ],
          realWorldOdisha: {
            title: 'Similipal Biosphere Reserve Canopy',
            titleOdia: 'ଶିମିଳିପାଳ ଜୈବମଣ୍ଡଳ ଓ ସାଳ ଜଙ୍ଗଲ',
            context: 'The dense Sal and Mahua forests of Similipal in Mayurbhanj district act as the green oxygen lungs of Odisha through massive photosynthetic capacity.',
            contextOdia: 'ମୟୂରଭଞ୍ଜର ଶିମିଳିପାଳ ଅଭୟାରଣ୍ୟର ସାଳ ଓ ମହୁଲ ଗଛ ଆଲୋକସଂଶ୍ଳେଷଣ ଦ୍ୱାରା ଓଡ଼ିଶାକୁ ପ୍ରଚୁର ଅମ୍ଳଜାନ ପ୍ରଦାନ କରନ୍ତି।'
          },
          funFact: {
            en: 'Algae in oceans and wetlands produce more than 50% of the world’s entire oxygen supply through photosynthesis!',
            or: 'ପୃଥିବୀର ୫୦% ରୁ ଅଧିକ ଅମ୍ଳଜାନ ସମୁଦ୍ର ଏବଂ ଜଳଭଣ୍ଡାରରେ ଥିବା ଶୈବାଳ (Algae) ପ୍ରସ୍ତୁତ କରନ୍ତି!'
          }
        },
        media_refs: ['/media/photosynthesis_diagram.png'],
        questions: [
          {
            question_text: 'What green pigment in plant leaves traps sunlight for photosynthesis?',
            question_text_odia: 'ସୂର୍ଯ୍ୟାଲୋକ ଶୋଷଣ କରିବା ପାଇଁ ପତ୍ରରେ କେଉଁ ସବୁଜ ରଙ୍ଗର କଣିକା ଥାଏ?',
            options: ['Hemoglobin', 'Chlorophyll', 'Melanin', 'Carotene'],
            options_odia: ['ହିମୋଗ୍ଲୋବିନ୍', 'ହରିତ୍‌କଣା (Chlorophyll)', 'ମେଲାନିନ୍', 'କାରୋଟିନ୍'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'The microscopic pores on leaves through which gas exchange takes place are called:',
            question_text_odia: 'ପତ୍ରରେ ଥିବା ଯେଉଁ କ୍ଷୁଦ୍ର ରନ୍ଧ୍ର ଦ୍ୱାରା ବାୟୁ ବିନିମୟ ହୁଏ ତାହାକୁ କ’ଣ କୁହାଯାଏ?',
            options: ['Vessels', 'Stomata', 'Xylem', 'Cuticle'],
            options_odia: ['ନାଳୀ', 'ସ୍ତୋମ (Stomata)', 'ଜାଇଲେମ୍', 'କ୍ୟୁଟିକଲ୍'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'Which test solution is used to detect the presence of starch in a de-pigmented green leaf?',
            question_text_odia: 'ପତ୍ରରେ ଶ୍ୱେତସାର (ଷ୍ଟାର୍ଚ୍) ଅଛି କି ନାହିଁ ପରୀକ୍ଷା କରିବା ପାଇଁ କେଉଁ ଦ୍ରବଣ ବ୍ୟବହୃତ ହୁଏ?',
            options: ['Iodine solution', 'Lime water', 'Copper sulphate', 'Hydrochloric acid'],
            options_odia: ['ଆୟୋଡିନ୍ ଦ୍ରବଣ', 'ଚୂନ ପାଣି', 'କପର ସଲଫେଟ୍', 'ହାଇଡ୍ରୋକ୍ଲୋରିକ୍ ଏସିଡ୍'],
            correct_option: 0,
            difficulty_tag: 'hard',
            points: 20
          }
        ]
      },
      {
        title: 'Heterotrophic & Insectivorous Plants',
        title_odia: 'ପରଭୋଜୀ ଏବଂ କୀଟଭୋଜୀ ଉଦ୍ଭିଦ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Some plants cannot make food on their own and rely on parasites (Cuscuta), saprophytes (Fungi), or trap insects for nitrogen (Pitcher plant).',
          summaryOdia: 'କେତେକ ଉଦ୍ଭିଦ ନିଜେ ଖାଦ୍ୟ ପ୍ରସ୍ତୁତ ନ କରି ପରଜୀବୀ (ନିର୍ମୂଳୀ), ମୃତୋପଜୀବୀ (ଛତୁ) କିମ୍ବା କୀଟପତଙ୍ଗ ଖାଇ ବଞ୍ଚନ୍ତି (କଳସୀ ପତ୍ରୀ)।',
          sections: [
            {
              title: 'Insectivorous Adaptations',
              titleOdia: 'କୀଟଭୋଜୀ ଉଦ୍ଭିଦର ବିଶେଷତା',
              content: 'Pitcher plants grow in nitrogen-deficient soil. Their leaves modify into tubular pitchers with digestive juices to trap and digest insects.',
              contentOdia: 'ଯେଉଁ ମାଟିରେ ନାଇଟ୍ରୋଜେନ୍ ଅଭାବ ଥାଏ, ସେଠାରେ କଳସୀ ପତ୍ରୀ ଉଦ୍ଭିଦ କୀଟପତଙ୍ଗ ଧରି ହଜମ କରି ନାଇଟ୍ରୋଜେନ୍ ପୋଷଣ ପାଆନ୍ତି।',
              keyPoints: ['Cuscuta (Amarbel) is a parasite with haustoria', 'Mushrooms are saprotrophic fungi that feed on decaying matter', 'Pitcher plant traps insects for nitrogen'],
              keyPointsOdia: ['ନିର୍ମୂଳୀ ଏକ ପରଜୀବୀ ଉଦ୍ଭିଦ', 'ଛତୁ ମୃତ ଜୈବ ପଦାର୍ଥରୁ ପୋଷଣ ଗ୍ରହଣ କରେ', 'କଳସୀ ପତ୍ରୀ ନାଇଟ୍ରୋଜେନ୍ ପାଇଁ କୀଟ ଖାଏ']
            }
          ],
          realWorldOdisha: {
            title: 'Odisha Tribal Forests & Wild Mushrooms',
            titleOdia: 'ଓଡ଼ିଶାର ଜଙ୍ଗଲ ଏବଂ ରୁଟୁକା ଛତୁ',
            context: 'During monsoon in Koraput and Kandhamal, tribal villagers forage wild saprophytic edible mushrooms (Rutu chhatu / Bali chhatu) that grow naturally on nutrient-rich forest litter.',
            contextOdia: 'କୋରାପୁଟ ଓ କନ୍ଧମାଳ ଜଙ୍ଗଲରେ ବର୍ଷାଦିନେ ପ୍ରାକୃତିକ ଭାବରେ ମୃତ କାଠପତ୍ର ଉପରେ ରୁଟୁକା ଛତୁ ଓ ବାଲି ଛତୁ ଗଜା ହୁଏ ଯାହା ପୁଷ୍ଟିକର।'
          },
          funFact: {
            en: 'Lichens are a cooperative symbiosis between an alga (which makes food) and a fungus (which provides shelter and minerals)!',
            or: 'ଲାଇକେନ୍ (Lichen) ହେଉଛି ଶୈବାଳ ଓ କବକ ମଧ୍ୟରେ ଏକ ଅଦ୍ଭୁତ ସହଜୀବୀ ସମ୍ପର୍କ!'
          }
        },
        media_refs: ['/media/pitcher_plant.png'],
        questions: [
          {
            question_text: 'Which of the following is an insectivorous plant?',
            question_text_odia: 'ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ କେଉଁଟି ଏକ କୀଟଭୋଜୀ ଉଦ୍ଭିଦ?',
            options: ['Cuscuta', 'Pitcher Plant (Nepenthes)', 'Rose', 'Mango'],
            options_odia: ['ନିର୍ମୂଳୀ', 'କଳସୀ ପତ୍ରୀ (Pitcher Plant)', 'ଗୋଲାପ', 'ଆମ୍ବ ଗଛ'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'Organisms that derive nutrition from dead and decaying matter are called:',
            question_text_odia: 'ମୃତ ଏବଂ ପଚାଶଢ଼ା ପଦାର୍ଥରୁ ଖାଦ୍ୟ ସଂଗ୍ରହ କରୁଥିବା ଜୀବଙ୍କୁ କ’ଣ କୁହାଯାଏ?',
            options: ['Autotrophs', 'Saprotrophs', 'Carnivores', 'Herbivores'],
            options_odia: ['ସ୍ୱଭୋଜୀ', 'ମୃତୋପଜୀବୀ (Saprotrophs)', 'ମାଂସାସୀ', 'ତୃଣଭୋଜୀ'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      }
    ]
  },

  // 6. Biology - Respiration in Organisms
  {
    subject: 'STEM - Biology',
    grade: 7,
    topic_name: 'Respiration in Organisms',
    topic_name_odia: 'ଜୀବମାନଙ୍କରେ ଶ୍ୱାସକ୍ରିୟା',
    order_index: 6,
    lessons: [
      {
        title: 'Aerobic vs Anaerobic Respiration',
        title_odia: 'ବାତୀୟ ଏବଂ ଅବାତୀୟ ଶ୍ୱାସକ୍ରିୟା',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Cellular respiration is the breakdown of glucose inside cells to release usable biological energy (ATP).',
          summaryOdia: 'କୋଷ ମଧ୍ୟରେ ଗ୍ଲୁକୋଜ୍ ଭାଙ୍ଗି ଶକ୍ତି (ATP) ନିର୍ଗତ ହେବା ପ୍ରକ୍ରିୟାକୁ କୋଷୀୟ ଶ୍ୱାସକ୍ରିୟା କୁହାଯାଏ।',
          sections: [
            {
              title: 'Cellular Energy Production',
              titleOdia: 'କୋଷରେ ଶକ୍ତି ଉତ୍ପାଦନ',
              content: 'Aerobic respiration requires oxygen and produces 36-38 ATP per glucose molecule. Anaerobic respiration happens without oxygen (e.g. yeast fermentation producing alcohol and CO2, or human muscle cramps producing lactic acid).',
              contentOdia: 'ଅମ୍ଳଜାନ ଉପସ୍ଥିତିରେ ହେଉଥିବା ଶ୍ୱାସକ୍ରିୟା ବାତୀୟ (ଅଧିକ ଶକ୍ତି ପ୍ରଦାନ କରେ)। ଅମ୍ଳଜାନ ଅନୁପସ୍ଥିତିରେ ଅବାତୀୟ ଶ୍ୱାସକ୍ରିୟା ହୁଏ (ମାଂସପେଶୀରେ ଲାକ୍ଟିକ୍ ଏସିଡ୍ ଜମି କ୍ରାମ୍ପ ହୁଏ)।',
              keyPoints: ['Aerobic: Glucose + O2 → CO2 + H2O + High Energy', 'Anaerobic in yeast produces alcohol and CO2', 'Muscle fatigue occurs due to temporary lactic acid buildup'],
              keyPointsOdia: ['ବାତୀୟ ଶ୍ୱାସକ୍ରିୟାରେ ଅମ୍ଳଜାନ ଆବଶ୍ୟକ ହୁଏ', 'ଇଷ୍ଟରେ ଅବାତୀୟ କିଣ୍ୱନ ଦ୍ୱାରା ମଦ୍ୟସାର ଓ CO2 ତିଆରି ହୁଏ', 'ମାଂସପେଶୀ କ୍ରାମ୍ପ ଲାକ୍ଟିକ୍ ଏସିଡ୍ ଜମିବା ଯୋଗୁଁ ହୁଏ']
            }
          ],
          realWorldOdisha: {
            title: 'Fermentation of Odisha Handia & Pitha',
            titleOdia: 'ଓଡ଼ିଶାର ଏଣ୍ଡୁରି ଓ ଚକୁଳି ପିଠାର କିଣ୍ୱନ',
            context: 'In traditional Odisha kitchens, rice-urad batter is fermented overnight by yeast and lactic bacteria respiring anaerobically, creating spongy Chakuli and Enduri Pitha.',
            contextOdia: 'ଓଡ଼ିଆ ଘରେ ଚକୁଳି ଓ ଏଣ୍ଡୁରି ପିଠା ପାଇଁ ଚାଉଳ-ବିରି ମିଶ୍ରଣକୁ ରାତିସାରା ରଖିଲେ ଇଷ୍ଟ ଅବାତୀୟ ଶ୍ୱାସକ୍ରିୟା କରି ପିଠାକୁ ନରମ କରେ।'
          },
          funFact: {
            en: 'Earthworms breathe directly through their moist skin, while fish absorb dissolved oxygen using gills!',
            or: 'ଜିଆ ନିଜ ଓଦାଳିଆ ଚର୍ମ ଦ୍ୱାରା ଶ୍ୱାସକ୍ରିୟା କରେ ଏବଂ ମାଛ ନିଜ ଗାଲିସି (Gills) ସାହାଯ୍ୟରେ ପାଣିରେ ଥିବା ଅମ୍ଳଜାନ ଗ୍ରହଣ କରେ!'
          }
        },
        media_refs: ['/media/respiration_fermentation.png'],
        questions: [
          {
            question_text: 'What end-product causes muscle cramps during intense sprinting?',
            question_text_odia: 'ଜୋରରେ ଦୌଡ଼ିବା ବେଳେ ମାଂସପେଶୀରେ କ’ଣ ଜମିବା ଯୋଗୁଁ ଯନ୍ତ୍ରଣା ହୁଏ?',
            options: ['Alcohol', 'Lactic acid', 'Carbonic acid', 'Uric acid'],
            options_odia: ['ମଦ୍ୟସାର (ଆଲକୋହଲ୍)', 'ଲାକ୍ଟିକ୍ ଏସିଡ୍', 'କାର୍ବୋନିକ୍ ଏସିଡ୍', 'ୟୁରିକ୍ ଏସିଡ୍'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'How do cockroaches and insects breathe?',
            question_text_odia: 'ଅସରପା ଏବଂ କୀଟପତଙ୍ଗ କିପରି ଶ୍ୱାସକ୍ରିୟା କରନ୍ତି?',
            options: ['Through lungs', 'Through spiracles and tracheae', 'Through skin only', 'Through antennae'],
            options_odia: ['ଫୁସଫୁସ୍ ଦ୍ୱାରା', 'ଶ୍ୱାସରନ୍ଧ୍ର (Spiracles) ଓ ନଳୀ ଦ୍ୱାରା', 'କେବଳ ଚର୍ମ ଦ୍ୱାରା', 'ଶୃଙ୍ଗିକା ଦ୍ୱାରା'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          },
          {
            question_text: 'During cellular respiration, energy is stored in which chemical molecule?',
            question_text_odia: 'କୋଷୀୟ ଶ୍ୱାସକ୍ରିୟାରେ ଶକ୍ତି କେଉଁ ଅଣୁ ଆକାରରେ ସଞ୍ଚିତ ହୋଇ ରହେ?',
            options: ['DNA', 'ATP', 'RNA', 'Hemoglobin'],
            options_odia: ['DNA', 'ATP (ଏଡିନୋସିନ୍ ଟ୍ରାଇଫସଫେଟ୍)', 'RNA', 'ହିମୋଗ୍ଲୋବିନ୍'],
            correct_option: 1,
            difficulty_tag: 'hard',
            points: 20
          }
        ]
      },
      {
        title: 'Breathing Mechanisms in Living Organisms',
        title_odia: 'ବିଭିନ୍ନ ପ୍ରାଣୀଙ୍କ ଶ୍ୱାସ ଅଙ୍ଗ ଏବଂ କାର୍ଯ୍ୟପଦ୍ଧତି',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Different species have specialized breathing organs: humans have lungs, fish have gills, insects have spiracles, and plants have stomata.',
          summaryOdia: 'ପ୍ରାଣୀମାନଙ୍କର ବିଭିନ୍ନ ପ୍ରକାର ଶ୍ୱାସ ଅଙ୍ଗ ଥାଏ: ମଣିଷର ଫୁସଫୁସ୍, ମାଛର ଗାଲିସି, ଏବଂ କୀଟମାନଙ୍କର ଶ୍ୱାସରନ୍ଧ୍ର।',
          sections: [
            {
              title: 'Human Inhalation and Exhalation',
              titleOdia: 'ମାନବ ଶ୍ୱାସ-ପ୍ରଶ୍ୱାସ ପ୍ରକ୍ରିୟା',
              content: 'When the muscular diaphragm contracts and moves down, chest volume expands, sucking air into the lungs. Exhaled air contains about 4.4% CO2 and 16.4% O2.',
              contentOdia: 'ମଧ୍ୟଚ୍ଛଦା (Diaphragm) ତଳକୁ ଗଲେ ଫୁସଫୁସ୍ ଭିତରକୁ ବାୟୁ ପ୍ରବେଶ କରେ। ନିଶ୍ୱାସ ବାୟୁରେ ପ୍ରାୟ ୪.୪% ଅଙ୍ଗାରକାମ୍ଳ ଥାଏ।',
              keyPoints: ['Diaphragm and ribcage control chest volume', 'Gills in fish absorb oxygen dissolved in water', 'Frogs can breathe through lungs and moist skin'],
              keyPointsOdia: ['ମଧ୍ୟଚ୍ଛଦା ଶ୍ୱାସକ୍ରିୟାରେ ମୁଖ୍ୟ ଭୂମିକା ଗ୍ରହଣ କରେ', 'ମାଛ ଗାଲିସି ଦ୍ୱାରା ପାଣିରୁ ଅମ୍ଳଜାନ ନିଏ', 'ବେଙ୍ଗ ଫୁସଫୁସ୍ ଓ ଓଦା ଚର୍ମ ଉଭୟ ଦ୍ୱାରା ଶ୍ୱାସକ୍ରିୟା କରେ']
            }
          ],
          realWorldOdisha: {
            title: 'Dolphin Breathing at Satapada (Chilika)',
            titleOdia: 'ସାତପଡ଼ା (ଚିଲିକା) ଇରାୱାଡି ଡଲଫିନ୍',
            context: 'Irrawaddy dolphins in Chilika Lake are aquatic mammals that must surface every few minutes to breathe atmospheric air through blowholes on top of their heads.',
            contextOdia: 'ଚିଲିକାର ଇରାୱାଡି ଡଲଫିନ୍ ଏକ ସ୍ତନ୍ୟପାୟୀ ପ୍ରାଣୀ, ତେଣୁ ସେମାନେ ମୁଣ୍ଡ ଉପରେ ଥିବା ଶ୍ୱାସରନ୍ଧ୍ର ଦ୍ୱାରା ବାୟୁ ଗ୍ରହଣ କରିବା ପାଇଁ ବାରମ୍ବାର ପାଣି ଉପରକୁ ଆସନ୍ତି।'
          },
          funFact: {
            en: 'A person resting typically takes 15 to 18 breaths per minute, moving over 11,000 liters of air daily!',
            or: 'ଏକ ସୁସ୍ଥ ବ୍ୟକ୍ତି ମିନିଟ୍‌କୁ ପ୍ରାୟ ୧୫ ରୁ ୧୮ ଥର ଶ୍ୱାସ-ପ୍ରଶ୍ୱାସ ନିଏ ଏବଂ ଦୈନିକ ୧୧,୦୦୦ ଲିଟର ବାୟୁ ଗ୍ରହଣ କରେ!'
          }
        },
        media_refs: ['/media/dolphin_breathing.png'],
        questions: [
          {
            question_text: 'Which organ helps fish extract oxygen dissolved in water?',
            question_text_odia: 'ପାଣିରେ ଦ୍ରବୀଭୂତ ଅମ୍ଳଜାନ ଗ୍ରହଣ କରିବା ପାଇଁ ମାଛର କେଉଁ ଅଙ୍ଗ ସାହାଯ୍ୟ କରେ?',
            options: ['Fins', 'Gills', 'Scales', 'Lateral line'],
            options_odia: ['ଡେଣା', 'ଗାଲିସି (Gills)', 'କାତି', 'ପାର୍ଶ୍ୱ ରେଖା'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'What major dome-shaped muscle beneath the lungs drives breathing in humans?',
            question_text_odia: 'ଫୁସଫୁସ୍ ତଳେ ଥିବା କେଉଁ ଗମ୍ବୁଜ ଆକୃତିର ମାଂସପେଶୀ ଶ୍ୱାସକ୍ରିୟା ଚଳାଏ?',
            options: ['Trachea', 'Diaphragm', 'Bronchiole', 'Larynx'],
            options_odia: ['ଶ୍ୱାସନଳୀ', 'ମଧ୍ୟଚ୍ଛଦା (Diaphragm)', 'ଶ୍ୱାସନିକା', 'ସ୍ୱରଯନ୍ତ୍ର'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      }
    ]
  },

  // 7. Mathematics - Fractions, Decimals & Ratios
  {
    subject: 'STEM - Mathematics',
    grade: 7,
    topic_name: 'Fractions, Decimals & Ratios',
    topic_name_odia: 'ଗଣିତ: ଭଗ୍ନାଂଶ, ଦଶମିକ ଏବଂ ଅନୁପାତ',
    order_index: 7,
    lessons: [
      {
        title: 'Mastering Fractions: Proper, Improper & Operations',
        title_odia: 'ଭଗ୍ନାଂଶର ଧାରଣା ଏବଂ ଗାଣିତିକ ପ୍ରକ୍ରିୟା',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'A fraction represents a part of a whole. Learn how to add, subtract, multiply, and divide fractions easily.',
          summaryOdia: 'ଭଗ୍ନାଂଶ ଏକ ସମଗ୍ର ବସ୍ତୁର କିଛି ଅଂଶକୁ ପ୍ରକାଶ କରେ। ଏଠାରେ ଭଗ୍ନାଂଶର ଯୋଗ, ବିୟୋଗ, ଗୁଣନ ଓ ହରଣ ଶିଖନ୍ତୁ।',
          sections: [
            {
              title: 'Multiplication and Division of Fractions',
              titleOdia: 'ଭଗ୍ନାଂଶର ଗୁଣନ ଓ ହରଣ',
              content: 'To multiply fractions: Multiply numerators together, multiply denominators together.\nTo divide fractions: Multiply the first fraction by the reciprocal (inverse) of the second fraction.',
              contentOdia: 'ଗୁଣନ: ଲବ × ଲବ / ହର × ହର।\nହରଣ: ପ୍ରଥମ ଭଗ୍ନାଂଶ × ଦ୍ୱିତୀୟ ଭଗ୍ନାଂଶର ବ୍ୟୁତକ୍ରମ (ଓଲଟା)। ଯଥା: (a/b) ÷ (c/d) = (a/b) × (d/c)।',
              keyPoints: ['Reciprocal of 3/5 is 5/3', 'Product of fractions = (Product of numerators) / (Product of denominators)'],
              keyPointsOdia: ['୩/୫ ର ବ୍ୟୁତକ୍ରମ ହେଉଛି ୫/୩', 'ହରଣ ସମୟରେ ପରବର୍ତ୍ତୀ ଭଗ୍ନାଂଶକୁ ଓଲଟାଇ ଗୁଣନ କରାଯାଏ']
            }
          ],
          realWorldOdisha: {
            title: 'Odisha Land Measurement: Guntha & Mana',
            titleOdia: 'ଓଡ଼ିଶାର ଜମି ମାପ: ଗୁଣ୍ଠ ଏବଂ ମାଣ',
            context: 'In Odisha villages, farmers divide land into fractions: 1 Mana = 25 Guntha. Half a Mana is 25/2 = 12.5 Guntha.',
            contextOdia: 'ଓଡ଼ିଶାର ଗାଁମାନଙ୍କରେ ଚାଷୀମାନେ ଜମିକୁ ଭଗ୍ନାଂଶରେ ମାପନ୍ତି: ୧ ମାଣ = ୨୫ ଗୁଣ୍ଠ। ଅଧା ମାଣ = ୧୨.୫ ଗୁଣ୍ଠ।'
          },
          funFact: {
            en: 'The fraction bar line separating numerator and denominator is called a "vinculum"!',
            or: 'ଲବ ଓ ହର ମଧ୍ୟରେ ଥିବା ଭାଗ ରେଖାଟିକୁ ଗଣିତରେ "ଭିନକୁଲମ୍" (Vinculum) କୁହାଯାଏ!'
          }
        },
        media_refs: ['/media/fractions_pie.png'],
        questions: [
          {
            question_text: 'What is the product of 3/4 and 2/5?',
            question_text_odia: '୩/୪ ଏବଂ ୨/୫ ର ଗୁଣଫଳ କେତେ?',
            options: ['5/9', '6/20 (or 3/10)', '5/20', '6/9'],
            options_odia: ['୫/୯', '୬/୨୦ (ବା ୩/୧୦)', '୫/୨୦', '୬/୯'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'What is (2/3) ÷ (4/9)?',
            question_text_odia: '(୨/୩) ÷ (୪/୯) ର ମୂଲ୍ୟ କେତେ?',
            options: ['3/2 (1.5)', '8/27', '2/9', '4/6'],
            options_odia: ['୩/୨ (୧.୫)', '୮/୨୭', '୨/୯', '୪/୬'],
            correct_option: 0,
            difficulty_tag: 'medium',
            points: 15
          },
          {
            question_text: 'A vessel contains 3/5 liters of water. If 1/4 liter is used, how much water remains?',
            question_text_odia: 'ଏକ ପାତ୍ରରେ ୩/୫ ଲିଟର ପାଣି ଥିଲା। ସେଥିରୁ ୧/୪ ଲିଟର ଖର୍ଚ୍ଚ ହେଲେ କେତେ ପାଣି ବଳକା ରହିବ?',
            options: ['2/1', '7/20 liter', '2/20 liter', '1/2 liter'],
            options_odia: ['୨/୧ ଲିଟର', '୭/୨୦ ଲିଟର', '୨/୨୦ ଲିଟର', '୧/୨ ଲିଟର'],
            correct_option: 1,
            difficulty_tag: 'hard',
            points: 20
          }
        ]
      },
      {
        title: 'Decimals, Percentages and Real Applications',
        title_odia: 'ଦଶମିକ, ଶତକଡ଼ା ଏବଂ ବ୍ୟାବହାରିକ ଗଣିତ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Decimals represent fractional parts in powers of ten. Learn quick multiplication, decimal shifting, and percentage conversion.',
          summaryOdia: 'ଦଶମିକ ସଂଖ୍ୟା ୧୦ର ଗୁଣିତକ ଭାଗକୁ ଦର୍ଶାଏ। ଏଠାରେ ଦଶମିକ ଗୁଣନ ଓ ଶତକଡ଼ା ରୂପାନ୍ତର ଶିଖନ୍ତୁ।',
          sections: [
            {
              title: 'Converting Fractions to Decimals and Percentages',
              titleOdia: 'ଭଗ୍ନାଂଶରୁ ଦଶମିକ ଓ ଶତକଡ଼ା ରୂପାନ୍ତର',
              content: 'To convert a fraction to percentage, multiply by 100%. Example: 3/5 = (3/5) × 100% = 60%. To multiply decimals: multiply ignoring decimals, then count total decimal places from right.',
              contentOdia: 'ଶତକଡ଼ା କରିବାକୁ ୧୦୦% ଗୁଣନ କରନ୍ତୁ: ୩/୫ = (୩/୫) × ୧୦୦% = ୬୦%। ଦଶମିକ ଗୁଣନରେ ସାଧାରଣ ଗୁଣନ କରି ଶେଷରେ ସମୁଦାୟ ଦଶମିକ ସ୍ଥାନ ଗଣି ବିନ୍ଦୁ ବସାନ୍ତୁ।',
              keyPoints: ['0.25 = 25/100 = 1/4 = 25%', '0.4 × 0.03 = 0.012 (3 decimal places)'],
              keyPointsOdia: ['୦.୨୫ = ୨୫/୧୦୦ = ୧/୪ = ୨୫%', '୦.୪ × ୦.୦୩ = ୦.୦୧୨']
            }
          ],
          realWorldOdisha: {
            title: 'Odisha Farmers Market (Mandi) Calculations',
            titleOdia: 'ଓଡ଼ିଶା କୃଷି ମଣ୍ଡିରେ ଧାନ ବିକ୍ରି ହିସାବ',
            context: 'When selling paddy at regulated mandis, moisture content must be below 17.0%. Decimal weight precision ensures farmers get fair pricing per quintal.',
            contextOdia: 'ମଣ୍ଡିରେ ଧାନ ବିକ୍ରି ବେଳେ ଆର୍ଦ୍ରତା ୧୭.୦% ତଳେ ରହିବା ଦରକାର। ଦଶମିକ ଓଜନ ହିସାବ ଚାଷୀଙ୍କୁ ସଠିକ୍ ପାଉଣା ଦିଏ।'
          },
          funFact: {
            en: 'The dot symbol for decimals was popularized by Scottish mathematician John Napier in 1617!',
            or: 'ଦଶମିକ ବିନ୍ଦୁର ବ୍ୟବହାର ୧୬୧୭ ମସିହାରେ ଗଣିତଜ୍ଞ ଜନ୍ ନେପିଅର୍ ଲୋକପ୍ରିୟ କରିଥିଲେ!'
          }
        },
        media_refs: ['/media/percentage_mandi.png'],
        questions: [
          {
            question_text: 'What is 0.75 expressed as a simplified fraction?',
            question_text_odia: '୦.୭୫ କୁ ସରଳ ଭଗ୍ନାଂଶରେ ପ୍ରକାଶ କଲେ କେତେ ହେବ?',
            options: ['1/2', '3/4', '7/5', '3/5'],
            options_odia: ['୧/୨', '୩/୪', '୭/୫', '୩/୫'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'What is 0.6 × 0.08?',
            question_text_odia: '୦.୬ × ୦.୦୮ ର ମୂଲ୍ୟ କେତେ?',
            options: ['0.48', '0.048', '0.0048', '4.8'],
            options_odia: ['୦.୪୮', '୦.୦୪୮', '୦.୦୦୪୮', '୪.୮'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      }
    ]
  },

  // 8. Mathematics - Geometry: Lines, Angles & Triangles
  {
    subject: 'STEM - Mathematics',
    grade: 7,
    topic_name: 'Lines, Angles & Triangle Properties',
    topic_name_odia: 'ଗଣିତ: ରେଖା, କୋଣ ଏବଂ ତ୍ରିଭୁଜର ଧର୍ମ',
    order_index: 8,
    lessons: [
      {
        title: 'Complementary, Supplementary & Vertically Opposite Angles',
        title_odia: 'ଅନୁପୂରକ, ପରିପୂରକ ଏବଂ ପ୍ରତିପ କୋଣ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'Two angles are complementary if their sum is 90°, and supplementary if their sum is 180°. Vertically opposite angles are equal.',
          summaryOdia: 'ଦୁଇଟି କୋଣର ପରିମାଣର ସମଷ୍ଟି ୯୦° ହେଲେ ଅନୁପୂରକ ଏବଂ ୧୮୦° ହେଲେ ପରିପୂରକ କୁହାଯାଏ। ପ୍ରତିପ କୋଣ ପରସ୍ପର ସମାନ।',
          sections: [
            {
              title: 'Angle Pairs and Properties',
              titleOdia: 'କୋଣ ଯୁଗ୍ମ ଏବଂ ସେମାନଙ୍କ ଧର୍ମ',
              content: '1. Complementary: ∠A + ∠B = 90°\n2. Supplementary: ∠A + ∠B = 180°\n3. Linear Pair: Adjacent supplementary angles on a straight line.\n4. When two lines intersect, vertically opposite angles are identical.',
              contentOdia: '୧. ଅନୁପୂରକ କୋଣ: ∠A + ∠B = ୯୦°\n୨. ପରିପୂରକ କୋଣ: ∠A + ∠B = ୧୮୦°\n୩. ରୈଖିକ ଯୁଗଳ: ସରଳରେଖା ଉପରେ ଥିବା ପାଖାପାଖି କୋଣର ସମଷ୍ଟି ୧୮୦°\n୪. ଦୁଇଟି ରେଖା ଛେଦ କଲେ ସମ୍ମୁଖ ପ୍ରତିପ କୋଣ ସମାନ ହୁଏ।',
              keyPoints: ['Complement of 35° is 55°', 'Supplement of 110° is 70°', 'Vertically opposite angles are always equal'],
              keyPointsOdia: ['୩୫° ର ଅନୁପୂରକ କୋଣ ହେଉଛି ୫୫°', '୧୧୦° ର ପରିପୂରକ କୋଣ ହେଉଛି ୭୦°', 'ପ୍ରତିପ କୋଣ ସର୍ବଦା ସମାନ']
            }
          ],
          realWorldOdisha: {
            title: 'Geometric Symmetry in Odisha Ikat & Pattachitra',
            titleOdia: 'ସମ୍ବଲପୁରୀ ବସ୍ତ୍ର ଏବଂ ପଟ୍ଟଚିତ୍ରରେ ଜ୍ୟାମିତିକ ସୌନ୍ଦର୍ଯ୍ୟ',
            context: 'Weavers of Sambalpuri Ikat sarees and master painters of Raghurajpur use precise geometric angles and parallel line symmetry to weave iconic patterns.',
            contextOdia: 'ସମ୍ବଲପୁରୀ ଇକତ ଶାଢ଼ୀ ଏବଂ ରଘୁରାଜପୁର ପଟ୍ଟଚିତ୍ରରେ ଶିଳ୍ପୀମାନେ ସଠିକ୍ କୋଣ ଏବଂ ସମାନ୍ତରାଳ ରେଖାର ଜ୍ୟାମିତିକ ସନ୍ତୁଳନ ବ୍ୟବହାର କରନ୍ତି।'
          },
          funFact: {
            en: 'The sum of all three interior angles in ANY triangle on a flat plane is always exactly 180 degrees!',
            or: 'ସମତଳରେ ଥିବା ଯେକୌଣସି ତ୍ରିଭୁଜର ତିନୋଟି କୋଣର ପରିମାଣର ସମଷ୍ଟି ସର୍ବଦା ୧୮୦ ଡିଗ୍ରୀ ହୋଇଥାଏ!'
          }
        },
        media_refs: ['/media/ikat_geometry.png'],
        questions: [
          {
            question_text: 'If two angles are complementary and one angle is 40°, what is the other angle?',
            question_text_odia: 'ଦୁଇଟି ଅନୁପୂରକ କୋଣ ମଧ୍ୟରୁ ଗୋଟିଏ ୪୦° ହେଲେ, ଅନ୍ୟଟି କେତେ?',
            options: ['50°', '140°', '60°', '90°'],
            options_odia: ['୫୦°', '୧୪୦°', '୬୦°', '୯୦°'],
            correct_option: 0,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'What is the supplement of an angle measuring 65°?',
            question_text_odia: '୬୫° କୋଣର ପରିପୂରକ କୋଣର ମାପ କେତେ?',
            options: ['25°', '115°', '125°', '180°'],
            options_odia: ['୨୫°', '୧୧୫°', '୧୨୫°', '୧୮୦°'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'If the two acute angles of a right-angled triangle are in the ratio 2:3, find the smallest angle.',
            question_text_odia: 'ଏକ ସମକୋଣୀ ତ୍ରିଭୁଜର ଅନ୍ୟ ଦୁଇଟି ସୂକ୍ଷ୍ମକୋଣର ଅନୁପାତ ୨:୩ ହେଲେ, କ୍ଷୁଦ୍ରତମ କୋଣଟି କେତେ?',
            options: ['30°', '36°', '45°', '54°'],
            options_odia: ['୩୦°', '୩୬°', '୪୫°', '୫୪°'],
            correct_option: 1,
            difficulty_tag: 'hard',
            points: 20
          }
        ]
      },
      {
        title: 'Triangles: Angle Sum and Exterior Angle Property',
        title_odia: 'ତ୍ରିଭୁଜ: କୋଣ ସମଷ୍ଟି ଏବଂ ବହିଃସ୍ଥ କୋଣର ଧର୍ମ',
        content_version: 1,
        language: 'or',
        content_body: {
          summary: 'In any triangle, the interior angle sum is 180°, and the measure of any exterior angle equals the sum of its two interior opposite angles.',
          summaryOdia: 'ତ୍ରିଭୁଜର ତିନି କୋଣର ସମଷ୍ଟି ୧୮୦° ଏବଂ ଏକ ବହିଃସ୍ଥ କୋଣର ମାପ ଏହାର ଦୁଇଟି ଅନ୍ତଃସ୍ଥ ବିପରୀତ କୋଣର ସମଷ୍ଟି ସହ ସମାନ।',
          sections: [
            {
              title: 'Exterior Angle Theorem',
              titleOdia: 'ବହିଃସ୍ଥ କୋଣ ପ୍ରମେୟ',
              content: 'Exterior angle = Sum of interior opposite angles.\nAlso, the sum of lengths of any two sides of a triangle is always greater than the length of the third side (Triangle Inequality).',
              contentOdia: 'ବହିଃସ୍ଥ କୋଣ = ଦୁଇଟି ଅନ୍ତଃସ୍ଥ ବିପରୀତ କୋଣର ସମଷ୍ଟି।\nତ୍ରିଭୁଜର ଯେକୌଣସି ଦୁଇ ବାହୁର ଦୈର୍ଘ୍ୟର ସମଷ୍ଟି ତୃତୀୟ ବାହୁ ଅପେକ୍ଷା ବଡ଼ ହୋଇଥାଏ।',
              keyPoints: ['∠Exterior = ∠InteriorOpposite1 + ∠InteriorOpposite2', 'Side a + Side b > Side c (always)'],
              keyPointsOdia: ['ବହିଃସ୍ଥ କୋଣ = ଅନ୍ତଃସ୍ଥ ବିପରୀତ କୋଣ ଦ୍ୱୟର ସମଷ୍ଟି', 'ଦୁଇ ବାହୁର ଯୋଗଫଳ ତୃତୀୟ ବାହୁଠାରୁ ଅଧିକ']
            }
          ],
          realWorldOdisha: {
            title: 'Truss Bridges Across Mahanadi River',
            titleOdia: 'ମହାନଦୀ ଉପରେ ଥିବା ତ୍ରିଭୁଜାକାର ଇସ୍ପାତ ପୋଲ',
            context: 'Railway and highway bridges spanning the Mahanadi River utilize triangular steel trusses because triangles are the most rigid geometric structure under dynamic loads.',
            contextOdia: 'ମହାନଦୀ ପୋଲ ନିର୍ମାଣରେ ତ୍ରିଭୁଜାକାର ଷ୍ଟିଲ୍ ଟ୍ରସ୍ ବ୍ୟବହାର କରାଯାଏ କାରଣ ତ୍ରିଭୁଜ ହେଉଛି ସବୁଠାରୁ ଦୃଢ଼ ଜ୍ୟାମିତିକ ଆକୃତି।'
          },
          funFact: {
            en: 'Pythagoras discovered the famous right-triangle rule (a² + b² = c²), which was also independently detailed in ancient Indian Shulba Sutras!',
            or: 'ସମକୋଣୀ ତ୍ରିଭୁଜର ବାହୁ ସୂତ୍ର (a² + b² = c²) ପ୍ରାଚୀନ ଭାରତୀୟ ଶୁଲ୍ବ ସୂତ୍ରରେ ମଧ୍ୟ ବର୍ଣ୍ଣିତ ଥିଲା!'
          }
        },
        media_refs: ['/media/mahanadi_bridge_truss.png'],
        questions: [
          {
            question_text: 'In a triangle, two angles are 50° and 70°. What is the third angle?',
            question_text_odia: 'ଗୋଟିଏ ତ୍ରିଭୁଜର ଦୁଇଟି କୋଣ ୫୦° ଏବଂ ୭୦° ହେଲେ, ତୃତୀୟ କୋଣଟି କେତେ?',
            options: ['50°', '60°', '70°', '80°'],
            options_odia: ['୫୦°', '୬୦°', '୭୦°', '୮୦°'],
            correct_option: 1,
            difficulty_tag: 'easy',
            points: 10
          },
          {
            question_text: 'If an exterior angle of a triangle is 110° and one interior opposite angle is 45°, what is the other interior opposite angle?',
            question_text_odia: 'ତ୍ରିଭୁଜର ଏକ ବହିଃସ୍ଥ କୋଣ ୧୧୦° ଏବଂ ଗୋଟିଏ ଅନ୍ତଃସ୍ଥ ବିପରୀତ କୋଣ ୪୫° ହେଲେ ଅନ୍ୟ ଅନ୍ତଃସ୍ଥ ବିପରୀତ କୋଣଟି କେତେ?',
            options: ['55°', '65°', '75°', '135°'],
            options_odia: ['୫୫°', '୬୫°', '୭୫°', '୧୩୫°'],
            correct_option: 1,
            difficulty_tag: 'medium',
            points: 15
          }
        ]
      }
    ]
  }
];
