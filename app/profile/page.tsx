// import { ProfileTabs } from "@/components/profile-tabs"
// import { UserStats } from "@/components/user-stats"
// import { UserAvatar } from "@/components/user-avatar"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 bg-card rounded-lg p-6 shadow-lg">
          {/* <UserAvatar /> */}
          {/* <UserStats /> */}
          <p>Coming Soon...</p>
        </div>
        <div className="w-full md:w-2/3">
          {/* <ProfileTabs /> */}
        </div>
      </div>
    </div>
  )
}

