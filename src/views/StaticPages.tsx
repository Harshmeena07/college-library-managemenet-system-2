import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Users, HelpCircle, Info } from 'lucide-react';

export function About() {
  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="flex-1 max-w-4xl mx-auto p-8 w-full">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-6 flex items-center text-slate-900 dark:text-white"><Info className="mr-3 text-blue-500 h-8 w-8"/> About Our Library</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
           Welcome to the Athena Library Management System. Established to provide seamless access to millions of physical and digital resources, our library stands as the central pillar of academic growth and innovation. 
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-8">
           We aim to combine traditional reading culture with modern digital infrastructure, ensuring that every student and faculty member can discover, request, and consume knowledge without friction.
        </p>
        <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=1200" alt="Library" className="rounded-xl w-full h-64 object-cover mb-4" />
      </div>
    </motion.div>
  )
}

export function Contact() {
  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="flex-1 max-w-4xl mx-auto p-8 w-full">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-8 flex items-center text-slate-900 dark:text-white"><Mail className="mr-3 text-blue-500 h-8 w-8"/> Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
            <div>
               <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200">Get in touch</h3>
               <div className="space-y-6">
                  <div className="flex items-start">
                     <MapPin className="text-blue-500 mr-4 h-6 w-6" />
                     <div><p className="font-medium text-slate-900 dark:text-white">Address</p><p className="text-slate-500 dark:text-slate-400">123 University Avenue, Central Campus, NY 10001</p></div>
                  </div>
                  <div className="flex items-start">
                     <Phone className="text-blue-500 mr-4 h-6 w-6" />
                     <div><p className="font-medium text-slate-900 dark:text-white">Phone</p><p className="text-slate-500 dark:text-slate-400">+1 (555) 123-4567</p></div>
                  </div>
                  <div className="flex items-start">
                     <Mail className="text-blue-500 mr-4 h-6 w-6" />
                     <div><p className="font-medium text-slate-900 dark:text-white">Email</p><p className="text-slate-500 dark:text-slate-400">library@college.edu</p></div>
                  </div>
               </div>
            </div>
            <div>
               <form className="flex flex-col gap-4">
                  <input className="px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-white" placeholder="Name" />
                  <input className="px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-white" placeholder="Email" />
                  <textarea className="px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-white h-32" placeholder="Message"></textarea>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">Send Message</button>
               </form>
            </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FAQ() {
  const faqs = [
    {q: 'How many books can I issue at once?', a: 'Students can issue up to 4 books simultaneously for a period of 14 days.'},
    {q: 'What is the penalty for late returns?', a: 'A fine of $0.50 per day is accrued for books returned past their due date.'},
    {q: 'Can I renew my books online?', a: 'Yes, as long as the book is not requested by another student, you can renew it once online.'},
    {q: 'What if I lost a library book?', a: 'You must report lost books immediately. You will be required to replace the book or pay its market value along with a processing fee.'}
  ];

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="flex-1 max-w-4xl mx-auto p-8 w-full">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-8 flex items-center text-slate-900 dark:text-white"><HelpCircle className="mr-3 text-blue-500 h-8 w-8"/> Frequently Asked Questions</h1>
        <div className="space-y-6">
           {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 dark:border-slate-700 pb-6 last:border-0 last:pb-0">
                 <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">{faq.q}</h3>
                 <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
           ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Team() {
  const team = [
    { name: 'Dr. Sarah Jenkins', role: 'Head Librarian', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { name: 'Michael Chen', role: 'Digital Archives Specialist', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Emily Rodriguez', role: 'Student Coordinator', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80' }
  ];

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="flex-1 max-w-4xl mx-auto p-8 w-full">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-8 flex items-center text-slate-900 dark:text-white"><Users className="mr-3 text-blue-500 h-8 w-8"/> Our Team</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">Meet the dedicated professionals ensuring that Athena LMS runs smoothly and provides excellent service to our student body.</p>
        <div className="grid sm:grid-cols-3 gap-8">
           {team.map((t, i) => (
              <div key={i} className="text-center">
                 <img src={t.img} alt={t.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-50 dark:border-slate-700 shadow-sm mb-4"/>
                 <h3 className="font-bold text-slate-800 dark:text-slate-200">{t.name}</h3>
                 <p className="text-sm text-blue-500 font-medium mt-1">{t.role}</p>
              </div>
           ))}
        </div>
      </div>
    </motion.div>
  )
}
