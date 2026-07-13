import './App.css'
import { Plane, MapPin, ArrowLeft, ArrowRight, Calendar, UserRoundPlus, X, AtSign, Plus } from 'lucide-react'
import { useState} from "react"

function App() {

  const [showStartScreen, setShowStartScreen] = useState(true)
  const [showInviteEmail, setShowInviteEmail] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const [emailsListInvite, setEmailsListInvite] = useState<string[]>([])

  function addNewEmailToInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString();

    if(!email)
      return

    if(emailsListInvite.includes(email)) {
      alert(`Email:${email} alread added.`)
      return
    }

    setEmailsListInvite(
     [
        ...emailsListInvite,
        email
     ]
    )
    
    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailsList = emailsListInvite.filter(email => email !== emailToRemove)
    setEmailsListInvite(newEmailsList)
  }

  return (
    
    <div className='flex flex-col items-center justify-center gap-8 p-4 h-screen'>
      <Plane size={48} className='text-cyan-600'/>
      <h1 className='justify-center align-middle gap-4'>
        Travel.com
      </h1>
      <p>Invite your friends and plan your next trip!</p>
      <div className='flex flex-col gap-4'>
        {
          showStartScreen &&
          <div className='flex gap-8 items-center justify-between bg-gray-800 w-full mx-auto p-4 rounded-xl'>
            <div className='flex items-center gap-2'>
              <MapPin size={20} />
              <input type="text" className='outline-0 py-3' placeholder="Where you go?" />
            </div>
            <div className='flex items-center gap-2'>
              <Calendar size={20} />
              When?
            </div>
            <button 
              onClick={() => {
                setShowStartScreen(!showStartScreen)
                setShowInviteEmail(!showInviteEmail)
              }}
              className='cursor-pointer flex gap-1 items-center bg-cyan-600 hover:bg-cyan-500 duration-200 text-white py-3 px-4 font-bold tracking-tight rounded-sm'>
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        }

        {
          showInviteEmail &&
          <div className='flex gap-4 items-center justify-betweenw-full mx-auto'>
            <ArrowLeft size={20} className='cursor-pointer' 
              onClick={() => {
                setShowStartScreen(!showStartScreen)
                setShowInviteEmail(!showInviteEmail)
              }}
            />
            <div className='flex gap-8 items-center justify-between bg-gray-800 w-full mx-auto p-4 rounded-xl'>
              <div className='flex items-center gap-2'>
                <UserRoundPlus size={20} />
                <input type="text" className='outline-0' placeholder="Insert your email" />
              </div>
              <button 
                onClick={() => setShowDialog(!showDialog)}
                className='cursor-pointer flex gap-1 items-center bg-₢hover:bg-cyan-500 duration-200 text-white py-3 px-4 font-bold tracking-tight rounded-sm'>
                Confirm travel 
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        }
      </div>

      {
        showDialog &&
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
              <div className='flex justify-between'>
                <p className='font-bold text-white'>
                  Select guests
                </p>
                <button>
                  <X className="size-5 cursor-pointer" onClick={() => setShowDialog(false)} />
                </button>
              </div>
              <p className='text-sm text-left'>The guests will receive an email to confirm their participation in the trip.</p>

              <div className='flex flex-wrap gap-2 mt-6'>
                {
                  emailsListInvite.map(email =>
                    <div key={email} className='flex py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2 text-white'>
                      {email}
                      <X 
                        className='size-5 text-zinc-400 cursor-pointer' 
                        onClick={() => {
                          removeEmailFromInvite(email)
                        }} 
                      />
                    </div>
                  )
                }
              </div>

              <form onSubmit={addNewEmailToInvite} className='flex gap-8 items-center justify-between bg-gray-800 w-full mx-auto p-3 pl-5 rounded-xl'>
                <div className='flex items-center gap-2'>
                  <AtSign width={16}/>
                  <input type="email" name="email" placeholder='Digit email' className='outline-0 py-3' />
                </div>

                <button className='cursor-pointer flex gap-1 items-center bg-cyan-600 hover:bg-cyan-500 duration-200 text-white py-3 px-4 font-bold tracking-tight rounded-sm'>
                  Invite
                  <Plus size={16} />
                </button>
              </form>
            </div>
        </div>
      }
    </div>
  )
}

export default App
