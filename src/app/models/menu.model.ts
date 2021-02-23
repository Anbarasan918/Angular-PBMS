export interface MenuRoute {
    path: string;
    title: string;
    icon?: string;
    submenu?: MenuRoute[];
}

export const MENU_ROUTES: MenuRoute[] = [
    {
        path: 'home',
        title: 'Home',
        icon: 'home'
    },
    {
        path: 'creation',
        title: 'Creation',
        icon: 'table_chart',
        submenu: [
            {
                path: '/creation/tank-list',
                title: 'Tank Creation'
            },
            {
                path: '/creation/pump-list',
                title: 'Pump Creation'
            },
            {
                path: '/creation/nozzle-list',
                title: 'Nozzle Creation'
            },
            {
                path: '/creation/product-list',
                title: 'Product Creation'
            },
            {
                path: '/creation/lubricant-list',
                title: 'Lubricant Creation'
            }
        ]
    },
    {
        path: 'tabs',
        title: 'Daily Entry',
        icon: 'text_fields',
        submenu: [
            {
                path: '/tabs/stretched-labels',
                title: 'Sales Entry'
            },
            {
                path: '/forms/validation-form',
                title: 'Purchase Entry'
            },
            {
                path: '/forms/attendance-entry',
                title: 'Attendance Entry'
            },
            {
                path: '/forms/expense-entry',
                title: 'Expense Entry'
            },
            {
                path: '/forms/ratechange-entry',
                title: 'RateChange Entry'
            }
        ]
    },
    {
        path: 'tabsa',
        title: 'HR Management',
        icon: 'tab',
        submenu: [
            {
                path: '/forms/simple-form',
                title: 'Employee Creation'
            },
            {
                path: '/tabs/salary-entry',
                title: 'Salary Management'
            },
            {
                path: '/tabs/stretched-labels',
                title: 'Staff Advance Entry'
            }
        ]
    }
];