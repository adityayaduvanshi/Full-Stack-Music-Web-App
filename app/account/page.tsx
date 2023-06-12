import Header from '@/components/Header';
import AccountContent from './components/AccountContent';

const Account = () => {
  return (
    <div className="bg-neutral-900 overflow-hidden rounded-lg overflow-y-auto w-full h-full">
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col mb-2 gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;
