import React from 'react'
import FlippingFeatureCard from './FlippingFeatureCard'
import { Mic, Download, Bot, CheckSquare, WifiOff, Smartphone, ShieldCheck, BarChart } from 'lucide-react'

// Updated features array with new props
const features = [
  {
    title: 'Live Session',
    frontDescription: 'Audio-first classroom',
    description: 'Audio-first, crystal-clear live classes that work even on unstable connections.',
    mainIcon: <Mic />,
    backIcon: <Mic className="w-6 h-6" />,
    idNumber: '01',
    backId: 'AU',
    hoverColor: '#C9BB3F',
    backTextColor: 'text-white',
  },
  {
    title: 'Offline-First',
    frontDescription: 'Downloadable content',
    description: 'Students can download highly compressed lectures to watch anytime, without internet.',
    mainIcon: <Download />,
    backIcon: <Download className="w-6 h-6" />,
    idNumber: '02',
    backId: 'DL',
    hoverColor: '#6F8DB5',
    backTextColor: 'text-white',
  },
  {
    title: 'AI Smart Notes',
    frontDescription: 'Auto-transcripts & summaries',
    description: 'Automatic transcripts and summaries for every lecture, making revision easy.',
    mainIcon: <Bot />,
    backIcon: <Bot className="w-6 h-6" />,
    idNumber: '03',
    backId: 'AI',
    hoverColor: '#5E4F2B',
    backTextColor: 'text-white',
  },
  {
    title: 'Interactive Tools',
    frontDescription: 'Polls, quizzes, and chat',
    description: 'Keep students engaged with live chat, polls, and quizzes that work at low bandwidth.',
    mainIcon: <CheckSquare />,
    backIcon: <CheckSquare className="w-6 h-6" />,
    idNumber: '04',
    backId: 'IN',
    hoverColor: '#D73F36',
    backTextColor: 'text-white',
  },
  {
    title: 'Low-Bandwidth',
    frontDescription: 'Optimized for 2G/3G',
    description: 'Prioritizes audio and optimizes content to perform reliably on 2G/3G networks.',
    mainIcon: <WifiOff />,
    backIcon: <WifiOff className="w-6 h-6" />,
    idNumber: '05',
    backId: 'LB',
    hoverColor: '#D73F36',
    backTextColor: 'text-white',
  },
  {
    title: 'Mobile First',
    frontDescription: 'Runs on any smartphone',
    description: 'A software-only solution that runs perfectly on entry-level smartphones.',
    mainIcon: <Smartphone />,
    backIcon: <Smartphone className="w-6 h-6" />,
    idNumber: '06',
    backId: 'MO',
    hoverColor: '#5E4F2B',
    backTextColor: 'text-white',
  },
  {
    title: 'Secure & Scalable',
    frontDescription: 'Enterprise-grade backend',
    description: 'Built with Mediasoup SFU, Prisma, and Docker for a robust, scalable backend.',
    mainIcon: <ShieldCheck />,
    backIcon: <ShieldCheck className="w-6 h-6" />,
    idNumber: '07',
    backId: 'SS',
    hoverColor: '#6F8DB5',
    backTextColor: 'text-white',
  },
    {
    title: 'Analytics',
    frontDescription: 'Track engagement',
    description: 'Track student engagement and progress to help educators and learners.',
    mainIcon: <BarChart />,
    backIcon: <BarChart className="w-6 h-6" />,
    idNumber: '08',
    backId: 'DA',
    hoverColor: '#C9BB3F',
    backTextColor: 'text-white',
  },
]

const FeatureGrid = () => {
  return (
    <section className="w-full py-24 px-5 bg-white dark:bg-black transition-colors">
      <div className="w-full mx-auto">
        <h2 className="text-4xl sm:text-5xl font-title font-bold text-center mb-28 mt-10 text-black dark:text-white font-sans">
          Why Our Platform?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
          {features.map((feature) => (
            <FlippingFeatureCard
              key={feature.idNumber}
              title={feature.title}
              frontDescription={feature.frontDescription}
              description={feature.description}
              mainIcon={feature.mainIcon}
              backIcon={feature.backIcon}
              idNumber={feature.idNumber}
              backId={feature.backId}
              hoverColor={feature.hoverColor}
              backTextColor={feature.backTextColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid;