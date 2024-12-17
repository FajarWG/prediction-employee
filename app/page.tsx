"use client";

import LoginForm from "@/components/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Employee Promotion Prediction
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the dashboard
          </p>
        </div>
        <Tabs defaultValue="login" className="w-[400px] mx-auto">
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="about">
            <div className="mt-8 text-center text-sm text-gray-600">
              <h3 className="font-semibold">Data Science Project</h3>
              <p>
                This project was made to fulfill the course assignment
                &quot;Data Science Project&quot;
              </p>
              <h4 className="font-semibold mt-2">Group Members:</h4>
              <ul className="list-none">
                <li>10121242 - Fajar Wahyu Gumelar</li>
                <li>10121225 - Nurul Dini Kamilah</li>
                <li>10121209 - Jovanka Siginendra</li>
                <li>10121219 - Reyhan Abhivandya F</li>
                <li>10121216 - Hani Agustina</li>
              </ul>
            </div>
          </TabsContent>
          <TabsList className="grid w-full grid-cols-2 mt-5">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
