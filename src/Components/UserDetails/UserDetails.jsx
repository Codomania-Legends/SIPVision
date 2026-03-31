import React, { useEffect } from 'react'
import DetailsOverview from '../DetailsOverview/DetailsOverview'
import { useDetails } from '../../Utilities/DetailsContext'
import { sileo } from 'sileo';
import AI from '../../Utilities/AI';

function UserDetails() {
  const { sipData, story, setStory } = useDetails();

  useEffect(() => {
    // Only run if we don't already have a story
    if (!story) {
      // 1. Convert the object to a string so the AI can actually read the data! 📖
      const dataString = JSON.stringify(sipData);

      // 2. Create the raw Promise first ⏳
      const storyPromise = AI(`According to this data Create a Story about User preferences and about himself which is Intresting and Unique, which if user read finds Intresting in 100-150 words Data - ${dataString}`);

      // 3. Give the Promise to Sileo so it can show those beautiful loading/success toasts! 🍞
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

      // 4. Wait for the promise to actually finish, THEN update the state with the real text! 🎯
      storyPromise
        .then((generatedStory) => {
          setStory(generatedStory);
        })
        .catch((error) => {
          console.error("AI Story generation failed:", error);
        });
    }
  }, [story, sipData, setStory]); // Always good practice to include dependencies! 🛡️

  return (
    <div className='h-screen w-screen flex justify-evenly items-center bg-slate-50'>
      <DetailsOverview />
      <div className='max-w-2xl mt-8 p-8 bg-white rounded-3xl shadow-xl text-center'>
        <h1 className='text-3xl font-black text-slate-800 mb-4'>Your Vision 🌟</h1>
        {story ? (
          <p className='text-slate-600 text-lg leading-relaxed font-medium'>{story}</p>
        ) : (
          <p className='text-slate-400 italic animate-pulse'>AI is cooking up your story...</p>
        )}
      </div>
    </div>
  )
}

export default UserDetails