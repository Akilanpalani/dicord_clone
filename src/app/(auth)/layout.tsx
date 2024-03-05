const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[#404EED]">
      {children}
    </div>
  )
}

export default AuthLayout;