import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

// Dummy data for users
const users = [
    { name: "Wedding", phone: "Bronze", date: "19 July", status: "Pending" },
    { name: "Party", phone: "Platinum", date: "19 July", status: "Pending" },
    { name: "Birthday", phone: "Silver", date: "19 July", status: "Pending" },
    { name: "Party", phone: "Gold", date: "19 July", status: "Pending" },
    { name: "Birthday", phone: "Platinum", date: "19 July", status: "Pending" },
    { name: "Party", phone: "Silver", date: "19 July", status: "Pending" },
    { name: "Birthday", phone: "Platinum", date: "19 July", status: "Pending" },
    { name: "Party", phone: "Silver", date: "19 July", status: "Pending" },
    { name: "Birthday", phone: "Platinum", date: "19 July", status: "Pending" },
    { name: "Party", phone: "Silver", date: "19 July", status: "Pending" },
    { name: "Birthday", phone: "Platinum", date: "19 July", status: "Pending" },
    { name: "Party", phone: "Silver", date: "19 July", status: "Pending" },
]

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">User Verification</h1>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Name</TableHead>
                                <TableHead className="text-center">Phone</TableHead>
                                <TableHead className="text-center">Date & Time</TableHead>
                                <TableHead className="text-center">Account Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{user.name}</TableCell>
                                    <TableCell className="text-center">{user.phone}</TableCell>
                                    <TableCell className="text-center">{user.date}</TableCell>
                                    <TableCell className="text-center text-gray-500">{user.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
