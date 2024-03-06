export const tableHeader = [
    {
        name: 'Наименование еденицы',
        id: 'unit_name',
        control: 'input',
        type: 'lookup',
        inputData: [
            {
                value: 'Мраморный щебень фр. 2-5 мм, 25кг',
                text: 'Мраморный щебень фр. 2-5 мм, 25кг'
            },
            {
                value: 'Мраморный щебень фр. 2-5 мм, 25кг (белый)',
                text: 'Мраморный щебень фр. 2-5 мм, 25кг (белый)'
            },
            {
                value: 'Мраморный щебень фр. 2-5 мм, 25кг (вайт)',
                text: 'Мраморный щебень фр. 2-5 мм, 25кг (вайт)'
            }
        ]
    },
    {
        name: 'Цена',
        id: 'price',
        control: 'input',
        type: 'number',
    },
    {
        name: 'Кол-во',
        id: 'amount',
        control: 'input',
        type: 'number',
    },
    {
        name: 'Название товара',
        id: 'good_name',
        control: 'input',
        type: 'lookup',
        inputData: [
            {
                value: 'Мраморный щебень 1',
                text: 'Мраморный щебень 1'
            },
            {
                value: 'Мраморный щебень 2',
                text: 'Мраморный щебень 2'
            },
            {
                value: 'Мраморный щебень 3',
                text: 'Мраморный щебень 3'
            }
        ]
    },
    {
        name: 'Итого',
        id: 'total',
        control: 'input',
        type: 'number',
    },
]

export const tableRows = [
    {
        id: 0,
        unit_name: 'Мраморный щебень фр. 2-5 мм, 25кг',
        price: '200',
        amount: '100',
        good_name: 'Мраморный щебень',
        total: '20000',
    },
    {
        id: 1,
        unit_name: 'Мраморный щебень фр. 2-5 мм, 35кг',
        price: '300',
        amount: '100',
        good_name: 'Мраморный щебень',
        total: '30000',
    },
    {
        id: 2,
        unit_name: 'Мраморный щебень фр. 2-5 мм, 45кг',
        price: '400',
        amount: '100',
        good_name: 'Мраморный щебень',
        total: '40000',
    },
]