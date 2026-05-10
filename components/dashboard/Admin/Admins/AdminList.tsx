import React from "react";

const admins = [
    {
        name: "Maja Lind",
        email: "maja.l@tactilenordic.se",
        groups: "GOTHENBURG GROUP",
        sellers: 31,
        orders: 845,
        status: "Away",
    },
    {
        name: "Ingrid Berg",
        email: "ingrid.b@tactilenordic.se",
        groups: "STOCKHOLM HUB",
        sellers: 42,
        orders: 1280,
        status: "Active",
    },
    {
        name: "Anders Jansson",
        email: "anders.j@tactilenordic.se",
        groups: "GLOBAL SALES",
        sellers: 128,
        orders: 4592,
        status: "Active",
    },
    {
        name: "Lina Holm",
        email: "lina.h@tactilenordic.se",
        groups: "INACTIVE",
        sellers: 0,
        orders: 0,
        status: "Disabled",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800";
        case "Away":
            return "bg-yellow-100 text-yellow-800";
        case "Disabled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const AdminList = () => {
    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1A1C1C]">System Controllers</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ADMIN NAME</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ASSIGNED GROUPS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLERS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDERS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                <td className="px-4 py-4">
                                    <div>
                                        <div className="text-[#1A1C1C] font-medium">{admin.name}</div>
                                        <div className="text-[#78716C] text-sm">{admin.email}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#D97706] text-white">{admin.groups}</span>
                                </td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{admin.sellers}</td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{admin.orders.toLocaleString()}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(admin.status)}`}>{admin.status}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <button className="text-[#D97706] hover:underline text-sm">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="text-[#78716C] text-sm">SHOWING 1 TO 10 OF 1,248 SELLERS</div>
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((page) => (
                        <button key={page} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${page === 1 ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminList;
