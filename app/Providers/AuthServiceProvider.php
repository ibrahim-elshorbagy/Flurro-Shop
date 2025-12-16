<?php

namespace App\Providers;

use App\Models\FinanceTrack\Task;
use App\Models\FinanceTrack\TaskSource;
use App\Models\FinanceTrack\Transaction;
use App\Models\FinanceTrack\Wallet;
use App\Policies\TaskPolicy;
use App\Policies\TaskSourcePolicy;
use App\Policies\TransactionPolicy;
use App\Policies\WalletPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Task::class => TaskPolicy::class,
        TaskSource::class => TaskSourcePolicy::class,
        Transaction::class => TransactionPolicy::class,
        Wallet::class => WalletPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
