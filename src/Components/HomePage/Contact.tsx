import { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Typed from 'typed.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MotionDiv } from '../../utils/motion';
import { MapPin, Phone } from 'lucide-react';
import { SectionContainer } from '../SectionContainer';
import { EmailBtn } from '../EmailBtn';

export const Contact: React.FC = () => {
     const [email, setEmail] = useState<string>('');
     const [topic, setTopic] = useState<string>('');
     const [message, setMessage] = useState<string>('');
     const [isSending, setIsSending] = useState<boolean>(false);

     const locationRef = useRef<HTMLSpanElement>(null);
     const phoneRef = useRef<HTMLSpanElement>(null);
     const messagePlaceholderRef = useRef<HTMLTextAreaElement>(null);
     const formRef = useRef<HTMLFormElement>(null);

     useEffect(() => {
          const locationTyped = new Typed(locationRef.current!, {
               strings: ['Kolkata, India'],
               typeSpeed: 50,
               backSpeed: 30,
               loop: true,
               backDelay: 2000,
               cursorChar: '_'
          });

          const phoneTyped = new Typed(phoneRef.current!, {
               strings: ['+91 9875324347'],
               typeSpeed: 50,
               backSpeed: 30,
               loop: true,
               backDelay: 2000,
               cursorChar: '_',
               startDelay: 1000
          });

          const messagePlaceholderTyped = new Typed(messagePlaceholderRef.current!, {
               strings: ['Type your message...', 'Share your thoughts...', 'Tell me about your project...'],
               typeSpeed: 40,
               backSpeed: 20,
               loop: true,
               backDelay: 1500,
               cursorChar: '',
               attr: 'placeholder',
               startDelay: 500
          });

          return () => {
               locationTyped.destroy();
               phoneTyped.destroy();
               messagePlaceholderTyped.destroy();
          };
     }, []);

     const copyToClipboard = (text: string) => {
          navigator.clipboard.writeText(text);
          toast.success('Phone number copied to clipboard!');
     };

     const validateForm = () => {
          if (!email.trim()) {
               toast.error('Please enter your email.');
               return false;
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
               toast.error('Please enter a valid email address.');
               return false;
          }

          if (!topic.trim()) {
               toast.error('Please enter a topic.');
               return false;
          }

          if (!message.trim()) {
               toast.error('Please enter a message.');
               return false;
          }

          return true;
     };

     const sendEmail = async (e: { preventDefault: () => void }) => {
          e.preventDefault();

          if (!validateForm()) return;

          setIsSending(true);

          try {
               await emailjs.sendForm(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    formRef.current!,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
               );

               toast.success('Email sent successfully!');
               formRef.current?.reset();
               setEmail('');
               setTopic('');
               setMessage('');
          }
          catch (error) {
               toast.error('Failed to send email. Please try again.');
               console.error('Error sending email:', error);
          }
          finally {
               setIsSending(false);
          }
     };

     return (
          <SectionContainer id="contact" title="CONNECT WITH ME">
               <div className="flex flex-row sm:flex-col-reverse items-center justify-center gap-10 w-full">
                    <MotionDiv
                         initial={{ opacity: 0, x: -20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.5 }}
                         viewport={{ once: true }}
                         className="space-y-4 sm:space-y-1"
                    >
                         <div className="flex justify-start items-center gap-4 pl-4 py-4 backdrop-blur-sm cursor-pointer">
                              <MapPin className="w-8 h-8 text-blue-400" />
                              <div className="">
                                   <h3 className="text-col-rev font-semibold">Location</h3>
                                   <p className="text-col-rev h-6">
                                        <span ref={locationRef}></span>
                                   </p>
                              </div>
                         </div>
                         <div onClick={() => copyToClipboard('+91 9875324347')} className="flex justify-start items-center gap-4 pl-4 py-4 backdrop-blur-sm cursor-pointer">
                              <Phone className="w-8 h-8 text-green-400" />
                              <div className="">
                                   <h3 className="text-col-rev font-semibold">Phone</h3>
                                   <p className="text-col-rev h-6">
                                        <span ref={phoneRef}></span>
                                   </p>
                              </div>
                         </div>
                         <EmailBtn />
                    </MotionDiv>
                    <MotionDiv
                         initial={{ opacity: 0 }}
                         whileInView={{ opacity: 1 }}
                         transition={{ delay: 0.5, duration: 0.3 }}
                         viewport={{ once: true }}
                         className="flex flex-col justify-center items-center w-1/2 sm:w-full gap-6 text-white"
                    >
                         <p className="text-center text-lg text-col-rev ">
                              Have a project in mind? Contact me below:
                         </p>

                         <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-2 w-full max-w-lg">
                              <input
                                   type="email"
                                   name="email"
                                   placeholder="Your E-mail"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="w-full p-3 rounded-lg form-bg placeholder:text-col-rev text-col-rev border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                   required
                              />

                              <input
                                   type="text"
                                   name="topic"
                                   placeholder="Discussion topic"
                                   value={topic}
                                   onChange={(e) => setTopic(e.target.value)}
                                   className="w-full p-3 rounded-lg form-bg placeholder:text-col-rev text-col-rev border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                              />

                              <textarea
                                   ref={messagePlaceholderRef}
                                   name="message"
                                   rows={5}
                                   value={message}
                                   onChange={(e) => setMessage(e.target.value)}
                                   className="w-full p-3 rounded-lg form-bg placeholder:text-col-rev text-col-rev border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                              ></textarea>

                              <button
                                   type="submit"
                                   className={`w-full bg-dynamic-rev text-col py-3 rounded-full 
                                hover:scale-[1.02] active:scale-95 transition-transform duration-300 
                                ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                   disabled={isSending}
                              >
                                   {isSending ? 'Sending...' : 'Submit'}
                              </button>
                         </form>
                    </MotionDiv>
               </div>
          </SectionContainer>
     );
};