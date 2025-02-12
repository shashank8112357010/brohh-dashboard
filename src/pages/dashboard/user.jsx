import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { SyncLoader } from 'react-spinners';
import { GetUsersService } from '@/services/api.service';

export function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await GetUsersService();
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <SyncLoader color="#000" size={15} />
            </div>
          ) : users.length > 0 ? (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {['Name', 'Email', 'Phone'].map((header) => (
                    <th key={header} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {header}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(({ _id, name, email, phone }, key) => {
                  const className = `py-3 px-5 ${key === users.length - 1 ? '' : 'border-b border-blue-gray-50'}`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                          {phone || 'N/A'}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Typography variant="small" color="blue-gray">
              No users found.
            </Typography>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default User;
