<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'demo@helpdesk.test'],
            ['name' => 'Demo User', 'password' => Hash::make('password123')]
        );

        if ($user->tickets()->count() === 0) {
            $user->tickets()->createMany([
                ['title' => 'Printer not working', 'description' => 'The office printer shows a paper jam error.', 'priority' => 'Medium', 'status' => 'Open', 'category' => 'Hardware'],
                ['title' => 'Cannot access VPN', 'description' => 'VPN client times out when connecting from home.', 'priority' => 'High', 'status' => 'In Progress', 'category' => 'Network'],
                ['title' => 'Reset my email password', 'description' => 'I forgot my email password and need a reset link.', 'priority' => 'Low', 'status' => 'Resolved', 'category' => 'Account'],
            ]);
        }
    }
}