'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

import apiInstance from '@/lib/api-instance';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useStore } from '@/store/useStore';

type LoginProps = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useStore((state) => state);

  const [formData, setFormData] = useState({
    username: 'emilys',
    password: 'emilyspass',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent, formData: LoginProps) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await apiInstance.post('/auth/login', {
        ...formData,
        // expiresInMins: 2,
      });

      if (response.status === 200) {
        Cookies.set('token', response.data.token);
        Cookies.set('refreshToken', response.data.refreshToken);
        setUser(response.data);
        toast('Success', {
          description: 'You have successfully logged in.',
        });
        router.replace('/dashboard');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, unused-imports/no-unused-vars
    } catch (error: any) {
      toast('Failed', {
        description: 'Invalid username or password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username and password to login to your account.
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="jhondoe"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                type="button"
                disabled={isLoading}
                onClick={(e) => handleLogin(e, formData)}
              >
                {isLoading ? 'Loading...' : 'Sign In'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
