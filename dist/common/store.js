"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDb = loadDb;
exports.saveDb = saveDb;
const fs_1 = require("fs");
const path_1 = require("path");
const DATA_DIR = (0, path_1.join)(process.cwd(), 'data');
const DATA_FILE = (0, path_1.join)(DATA_DIR, 'db.json');
const defaultDb = {
    kitchens: [
        {
            id: 'kit-001',
            name: 'Fast PP',
            description: 'Правильное питание и домашние рационы. Свежее каждый день.',
            cuisineTypes: ['пп', 'домашняя'],
            commissionRate: 18,
            minOrder: 35000,
            status: 'active',
            rating: 4.8,
            createdAt: new Date().toISOString(),
        },
        {
            id: 'kit-002',
            name: 'Mamochka Kitchen',
            description: 'Домашняя еда как у мамы. Плов, супы, выпечка.',
            cuisineTypes: ['домашняя', 'узбекская'],
            commissionRate: 16,
            minOrder: 30000,
            status: 'active',
            rating: 4.9,
            createdAt: new Date().toISOString(),
        },
        {
            id: 'kit-003',
            name: 'Green Bowl',
            description: 'Лёгкие боулы, салаты и детокс-меню.',
            cuisineTypes: ['пп', 'вегетарианское'],
            commissionRate: 20,
            minOrder: 30000,
            status: 'active',
            rating: 4.6,
            createdAt: new Date().toISOString(),
        },
        {
            id: 'kit-004',
            name: 'Protein Lab',
            description: 'Высокобелковое меню для зала и сушки.',
            cuisineTypes: ['пп', 'спорт'],
            commissionRate: 17,
            minOrder: 40000,
            status: 'active',
            rating: 4.7,
            createdAt: new Date().toISOString(),
        },
        {
            id: 'kit-005',
            name: 'Tashkent Home',
            description: 'Семейная узбекская кухня: шурпа, манты, свежая выпечка.',
            cuisineTypes: ['узбекская', 'домашняя'],
            commissionRate: 15,
            minOrder: 30000,
            status: 'active',
            rating: 4.85,
            createdAt: new Date().toISOString(),
        },
    ],
    menu: [
        { id: 'd-001', kitchenId: 'kit-001', name: 'Куриная грудка с киноа', description: 'Запечённая куриная грудка, киноа, овощи гриль. Высокий белок, без лишнего масла', price: 45000, category: 'Обед', calories: 420, proteins: 38, fats: 12, carbs: 35, tags: ['пп', 'белок'], isAvailable: true, popular: true },
        { id: 'd-002', kitchenId: 'kit-001', name: 'Омлет с авокадо', description: 'Пышный омлет с шпинатом, томатами и авокадо. Сытный ПП-завтрак', price: 32000, category: 'Завтрак', calories: 310, proteins: 18, fats: 22, carbs: 8, tags: ['пп', 'завтрак'], isAvailable: true, popular: true },
        { id: 'd-003', kitchenId: 'kit-001', name: 'Лосось с брокколи', description: 'Лосось на пару, брокколи al dente, лимон. Омега-3 и лёгкий ужин', price: 62000, category: 'Ужин', calories: 480, proteins: 42, fats: 28, carbs: 10, tags: ['пп', 'омега-3'], isAvailable: true, popular: false },
        { id: 'd-004', kitchenId: 'kit-001', name: 'Творожная запеканка', description: 'Нежная творожная запеканка с ягодами, без сахара. Много белка', price: 28000, category: 'Завтрак', calories: 290, proteins: 22, fats: 9, carbs: 28, tags: ['пп'], isAvailable: true, popular: false },
        { id: 'd-005', kitchenId: 'kit-002', name: 'Плов с говядиной', description: 'Классический узбекский плов с говядиной, зира, морковь. Как дома', price: 38000, category: 'Обед', calories: 650, proteins: 28, fats: 22, carbs: 70, tags: ['домашняя', 'узбекская'], isAvailable: true, popular: true },
        { id: 'd-006', kitchenId: 'kit-002', name: 'Лагман', description: 'Домашний лагман: лапша, мясо, болгарский перец и специи', price: 35000, category: 'Обед', calories: 520, proteins: 24, fats: 18, carbs: 58, tags: ['домашняя'], isAvailable: true, popular: true },
        { id: 'd-007', kitchenId: 'kit-002', name: 'Самса с мясом', description: 'Самса с мясом, 3 шт. Хрустящее тесто, сочная начинка', price: 25000, category: 'Закуска', calories: 480, proteins: 16, fats: 24, carbs: 48, tags: ['выпечка'], isAvailable: true, popular: false },
        { id: 'd-008', kitchenId: 'kit-002', name: 'Мастава', description: 'Густая мастава с рисом, мясом и овощами. Сытный домашний суп', price: 30000, category: 'Обед', calories: 410, proteins: 20, fats: 14, carbs: 45, tags: ['суп', 'домашняя'], isAvailable: true, popular: false },
        { id: 'd-009', kitchenId: 'kit-003', name: 'Боул с киноа и овощами', description: 'Боул: киноа, авокадо, нут, свежая зелень. Лёгкий и сытный', price: 42000, category: 'Обед', calories: 380, proteins: 14, fats: 16, carbs: 48, tags: ['пп', 'вегетарианское'], isAvailable: true, popular: true },
        { id: 'd-010', kitchenId: 'kit-003', name: 'Салат Цезарь лайт', description: 'Цезарь лайт: курица гриль, салат романо, лёгкий соус без майонеза', price: 36000, category: 'Обед', calories: 320, proteins: 26, fats: 14, carbs: 12, tags: ['пп', 'салат'], isAvailable: true, popular: true },
        { id: 'd-011', kitchenId: 'kit-003', name: 'Смузи боул ягодный', description: 'Ягодный смузи-боул: йогурт, ягоды, гранола и семена чиа', price: 34000, category: 'Завтрак', calories: 310, proteins: 12, fats: 10, carbs: 44, tags: ['пп', 'завтрак'], isAvailable: true, popular: false },
        { id: 'd-012', kitchenId: 'kit-003', name: 'Тост с авокадо', description: 'Тост на цельнозерновом хлебе с авокадо и яйцом пашот', price: 29000, category: 'Завтрак', calories: 340, proteins: 14, fats: 20, carbs: 28, tags: ['пп'], isAvailable: true, popular: false },
        { id: 'd-013', kitchenId: 'kit-004', name: 'Индейка с бататом', description: 'Филе индейки, печёный батат, стручковая фасоль', price: 48000, category: 'Обед', calories: 440, proteins: 45, fats: 10, carbs: 38, tags: ['пп', 'белок', 'спорт'], isAvailable: true, popular: true },
        { id: 'd-014', kitchenId: 'kit-004', name: 'Протеиновые панкейки', description: 'Панкейки на яичных белках, ягоды, без сахара', price: 36000, category: 'Завтрак', calories: 350, proteins: 32, fats: 8, carbs: 36, tags: ['пп', 'спорт', 'завтрак'], isAvailable: true, popular: true },
        { id: 'd-015', kitchenId: 'kit-004', name: 'Говядина с гречкой', description: 'Томлёная говядина, гречка, огуречный салат', price: 52000, category: 'Ужин', calories: 510, proteins: 48, fats: 16, carbs: 42, tags: ['пп', 'белок'], isAvailable: true, popular: false },
        { id: 'd-016', kitchenId: 'kit-004', name: 'Тунец боул', description: 'Тунец, рис бурый, эдамаме, нори', price: 55000, category: 'Обед', calories: 460, proteins: 40, fats: 14, carbs: 44, tags: ['пп', 'омега-3'], isAvailable: true, popular: false },
        { id: 'd-017', kitchenId: 'kit-005', name: 'Шурпа', description: 'Наваристая шурпа с говядиной и овощами', price: 34000, category: 'Обед', calories: 390, proteins: 22, fats: 16, carbs: 32, tags: ['суп', 'узбекская', 'домашняя'], isAvailable: true, popular: true },
        { id: 'd-018', kitchenId: 'kit-005', name: 'Манты', description: 'Домашние манты с мясом, 5 шт', price: 40000, category: 'Обед', calories: 560, proteins: 26, fats: 22, carbs: 58, tags: ['узбекская', 'домашняя'], isAvailable: true, popular: true },
        { id: 'd-019', kitchenId: 'kit-005', name: 'Казан-кебаб', description: 'Говядина с картофелем из казана', price: 46000, category: 'Ужин', calories: 620, proteins: 34, fats: 28, carbs: 48, tags: ['узбекская'], isAvailable: true, popular: false },
        { id: 'd-020', kitchenId: 'kit-005', name: 'Лепёшка с каймоком', description: 'Свежая лепёшка и каймок к чаю', price: 18000, category: 'Закуска', calories: 280, proteins: 8, fats: 12, carbs: 36, tags: ['выпечка', 'домашняя'], isAvailable: true, popular: false },
    ],
    orders: [],
    users: [
        { id: 'user-admin', phone: '+998901111111', name: 'Admin', role: 'admin', createdAt: new Date().toISOString() },
        { id: 'user-partner1', phone: '+998902222222', name: 'Fast PP Owner', role: 'partner', kitchenId: 'kit-001', createdAt: new Date().toISOString() },
        { id: 'user-partner2', phone: '+998905555555', name: 'Mamochka Owner', role: 'partner', kitchenId: 'kit-002', createdAt: new Date().toISOString() },
        { id: 'user-partner3', phone: '+998904444444', name: 'Green Bowl Owner', role: 'partner', kitchenId: 'kit-003', createdAt: new Date().toISOString() },
        { id: 'user-partner4', phone: '+998906666666', name: 'Protein Lab Owner', role: 'partner', kitchenId: 'kit-004', createdAt: new Date().toISOString() },
        { id: 'user-partner5', phone: '+998907777777', name: 'Tashkent Home Owner', role: 'partner', kitchenId: 'kit-005', createdAt: new Date().toISOString() },
        { id: 'user-client', phone: '+998903333333', name: 'Alisher', role: 'client', createdAt: new Date().toISOString() },
    ],
    reviews: [
        { id: 'r-001', kitchenId: 'kit-001', author: 'Дильноза', rating: 5, text: 'Очень вкусно и по делу, без лишнего масла.', createdAt: new Date().toISOString() },
        { id: 'r-002', kitchenId: 'kit-001', author: 'Жахонгир', rating: 5, text: 'Удобно заказать ПП на весь день.', createdAt: new Date().toISOString() },
        { id: 'r-003', kitchenId: 'kit-002', author: 'Нигора', rating: 5, text: 'Плов как у мамы, самса огонь.', createdAt: new Date().toISOString() },
        { id: 'r-004', kitchenId: 'kit-002', author: 'Отабек', rating: 4, text: 'Домашний вкус, привезли горячим.', createdAt: new Date().toISOString() },
        { id: 'r-005', kitchenId: 'kit-003', author: 'Малика', rating: 5, text: 'Лёгкие боулы, идеально после зала.', createdAt: new Date().toISOString() },
        { id: 'r-006', kitchenId: 'kit-004', author: 'Тимур', rating: 5, text: 'Много белка, удобно на сушке.', createdAt: new Date().toISOString() },
        { id: 'r-007', kitchenId: 'kit-005', author: 'Зарина', rating: 5, text: 'Шурпа и манты — огонь, как у бабушки.', createdAt: new Date().toISOString() },
    ],
    partnerApplications: [],
    orderCounter: 1,
};
function ensure() {
    if (!(0, fs_1.existsSync)(DATA_DIR))
        (0, fs_1.mkdirSync)(DATA_DIR, { recursive: true });
    if (!(0, fs_1.existsSync)(DATA_FILE)) {
        (0, fs_1.writeFileSync)(DATA_FILE, JSON.stringify(defaultDb, null, 2), 'utf8');
    }
}
function loadDb() {
    ensure();
    try {
        const db = JSON.parse((0, fs_1.readFileSync)(DATA_FILE, 'utf8'));
        if (!db.reviews)
            db.reviews = defaultDb.reviews;
        if (!db.partnerApplications)
            db.partnerApplications = [];
        return db;
    }
    catch {
        return structuredClone(defaultDb);
    }
}
function saveDb(db) {
    ensure();
    (0, fs_1.writeFileSync)(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
}
//# sourceMappingURL=store.js.map