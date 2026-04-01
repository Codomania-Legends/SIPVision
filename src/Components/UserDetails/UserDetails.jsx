import React, { useEffect } from 'react'
import DetailsOverview from '../DetailsOverview/DetailsOverview'
import { useDetails } from '../../Utilities/DetailsContext'
import { sileo } from 'sileo';
import AI from '../../Utilities/AI';

function UserDetails() {
  const { sipData, story, setStory } = useDetails();

  useEffect(() => {
    if (!story) {
      const dataString = JSON.stringify(sipData);

      const storyPromise = AI(`According to this data Create a Story about User preferences and about himself which is Intresting and Unique, which if user read finds Intresting in 100-150 words Data - ${dataString}`);

      sileo.promise(storyPromise, {
        loading: {
          title: "Creating your story... 🤖",
          description: "Our AI is weaving your financial future into a narrative..."
        },
        success: {
          title: "Story Created! ✨",
          description: "Your personalized financial story is ready!"
        },
        error: {
          title: "Story Creation Failed ⚠️",
          description: "We couldn't generate your story this time. Please try again."
        }
      });

      storyPromise
        .then((generatedStory) => {
          setStory(generatedStory);
        })
        .catch((error) => {
          console.error("AI Story generation failed:", error);
        });
    }
  }, [story, sipData, setStory]);

  return (
    <div className='min-h-screen w-full flex flex-col lg:flex-row justify-center lg:justify-evenly items-center bg-slate-50 p-4 md:p-8 gap-8 lg:gap-0 pt-20 md:pt-8'>
      <div className="w-full max-w-md lg:max-w-none flex justify-center">
        <DetailsOverview />
      </div>

      <div className='w-full max-w-2xl p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-xl text-center border border-slate-100'>
        <h1 className='text-2xl md:text-3xl font-black text-slate-800 mb-3 md:mb-4'>Your Vision 🌟</h1>
        
        {story ? (
          <p className='text-slate-600 text-base md:text-lg leading-relaxed font-medium'>
            {story}
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className='text-slate-400 italic animate-pulse text-sm md:text-base'>
              AI is cooking up your story... 🍳
            </p>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default UserDetails