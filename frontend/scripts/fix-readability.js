#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define all the text replacements organized by file and field path
const replacements = {
  'about.json': {
    'page.fallbackContent':
      "<p>Delaware DSA is Delaware's state chapter of the Democratic Socialists of America. We work to build a fair society that puts people before profit.</p>",
    'aboutHero.defaultMissionStatement':
      'Delaware DSA works to build a fair society where all people can thrive. We bring together people from different backgrounds to fight for justice and equality.',
    'achievements.defaultAchievements.0':
      'We helped pass new laws in Wilmington that protect renters from unfair treatment.',
    'achievements.defaultAchievements.1':
      'We set up help networks during COVID-19. We made sure families had food, medicine, and support when they needed it most.',
    'achievements.defaultAchievements.3':
      'We support workers across the state as they organize for better pay and working conditions.',
    'achievements.defaultAchievements.4':
      'We work with local groups that fight for racial justice and civil rights.',
    'democraticSocialism.principles.0.description':
      'We believe workers should have a say in how their workplaces run. The economy should serve everyone, not just the wealthy.',
    'democraticSocialism.principles.2.description':
      'We support workers who organize for better wages, benefits, and safe working conditions.',
    'democraticSocialism.principles.3.description':
      'We support Medicare for All. Everyone should have healthcare as a basic right.',
    'getInvolved.involvementOptions.0.description':
      'Join DSA to be part of the largest socialist group in America.',
    'nationalInfo.description':
      'Delaware DSA is part of the Democratic Socialists of America. DSA is the largest socialist group in the United States.',
  },

  'bylaws.json': {
    fallbackContent:
      '<p>The Delaware DSA bylaws explain how our chapter works. They show how we make decisions and run our organization. Our members voted to approve these rules.</p><p>Our bylaws show our commitment to democracy and transparency. They explain what our officers and committees do.</p>',
    'keyGovernanceSections.0.description':
      'Our chapter has a Steering Committee, elected officers, and working groups. We hold membership meetings every month.',
    'keyGovernanceSections.1.description':
      'We make important decisions by having members vote. We try to reach agreement while still being able to act quickly when needed.',
    'keyGovernanceSections.2.description':
      'Officers serve for two years. We hold elections every year with different positions. This helps keep our leadership strong.',
    'frequentlyAskedQuestions.2.answer':
      'We last updated our bylaws on {lastUpdated}. The changes included updates to how we organize committees and run elections.',
    'frequentlyAskedQuestions.3.answer':
      "Our local bylaws work with the national DSA rules. When there's a conflict, the national rules come first.",
    'otherDocuments.0.description':
      "Important votes passed by our members that guide our chapter's goals and positions.",
    'otherDocuments.1.description':
      'Our internal rules including our code of conduct and how we handle conflicts.',
    'otherDocuments.2.description':
      'The national DSA constitution and bylaws that govern our whole organization.',
  },

  'calendar.json': {
    'page.subtitle':
      'Join us for meetings, actions, classes, and social events.',
    'page.errorMessage':
      "We're having trouble loading events right now. Please try again later or contact us.",
    'page.subscribeText':
      'Stay up to date with all Delaware DSA events by subscribing to our calendar.',
    'subscription.subscriptionInstructions':
      'Subscribe to get automatic updates about Delaware DSA events sent to your calendar.',
  },

  'committees.json': {
    html: '<p>Information about each working group will be shown here.</p>',
  },

  'home.json': {
    'heroSection.description':
      'Building working-class power across Delaware through democracy and action.',
    'missionSection.paragraphs.0':
      'We build worker power through organizing together.',
    'missionSection.paragraphs.1':
      'We fight for housing, immigrant rights, and Palestine freedom.',
    'strategicPrioritiesSection.priorities.0.description':
      'Working with immigrant rights groups to protect people from deportation and detention.',
    'strategicPrioritiesSection.priorities.1.description':
      "Building coalitions to reduce economic support for the state of Israel's actions.",
    'strategicPrioritiesSection.priorities.2.description':
      'Fighting for tenant protections and affordable housing through grassroots organizing.',
    'strategicPrioritiesSection.priorities.3.description':
      'Working to make Delaware actively support transgender rights and protections.',
    'committeesCard.committees.0.description':
      'Advocate for tenant rights and campaign for affordable housing options.',
    'committeesCard.committees.1.description':
      'Organize global solidarity actions and build anti-war movements.',
    'committeesCard.committees.3.description':
      'Amplify LGBTQ+ voices and bring queer perspectives to all our work.',
    'committeesCard.committees.4.description':
      'Focus on bringing in new members and creating meaningful experiences for all.',
    'committeesCard.committees.5.description':
      'Handle our messaging, create newsletters, and manage our online presence.',
    'committeesCard.committees.6.description':
      'Provide safety and security planning for our events and actions.',
    'committeesCard.committees.7.description':
      'Manage election work, candidate relationships, and political strategy.',
    'committeesCard.committees.8.description':
      'Organize classes, reading groups, and create educational resources.',
    'committeesCard.committees.9.description':
      'Organize community support networks and direct aid programs.',
    'committeesCard.committees.10.description':
      'Monitor Delaware laws and policies that affect working people.',
    'committeesCard.committees.11.description':
      'Use creative approaches to organizing and develop art that shows socialist values.',
    'joinCTASection.description':
      "Become part of Delaware's growing movement for democratic socialism.",
  },

  'join.json': {
    'joinHero.subtitle':
      'Become part of a democratic organization working for economic and social justice.',
    'whyJoinDSA.items.0.description':
      'Connect with people who share your commitment to social and economic justice.',
    'whyJoinDSA.items.1.description':
      'Join classes and workshops that build your organizing skills.',
    'whyJoinDSA.items.2.description':
      'Join campaigns for Medicare for All, Green New Deal, housing justice, and more.',
    'membershipOptions.dsaMembership.benefits.0':
      '<strong>National membership</strong> with automatic Delaware DSA chapter membership',
    'membershipOptions.dsaMembership.benefits.1':
      '<strong>Sliding scale dues</strong> based on your income ($27-$130 per year)',
    'membershipOptions.dsaMembership.benefits.2':
      '<strong>Publications</strong> including the Democratic Left magazine and chapter newsletter',
    'membershipOptions.dsaMembership.benefits.3':
      '<strong>Voting rights</strong> in Delaware DSA chapter decisions and elections',
    'membershipOptions.dsaMembership.benefits.4':
      '<strong>Full participation</strong> in national and local campaigns and events',
    'testimonials.testimonials.0.quote':
      'Joining Delaware DSA gave me a way to turn my passion for justice into real action in my community.',
    'faq.questions.0.answer':
      "Democratic socialism means workers and communities should control the economy, not wealthy corporations. It's about making sure everyone has what they need to live well.",
    'faq.questions.1.answer':
      'Members participate in different ways based on what they can do. Some attend monthly meetings. Others join committees or help with campaigns.',
    'faq.questions.2.answer':
      "You don't need to call yourself a socialist to join DSA. Many members are still learning about socialism while doing the work.",
    'faq.questions.3.answer':
      "Membership dues fund DSA's national organization and local chapter work. Dues help pay for materials, events, and campaigns.",
  },

  'leadership.json': {
    introContent:
      '<p>Delaware DSA is run by its members through democratic leadership. Our structure ensures that all members have a voice in how we operate.</p>',
    fallbackContent:
      '<p>Delaware DSA is run by its members through democratic leadership. Our structure ensures that all members have a voice in how we operate.</p>',
    'chapterStructure.description':
      'Our chapter operates with the following structure:',
    'chapterStructure.structureItems.generalMembership.description':
      'All dues-paying members can vote at meetings and help make important decisions about our work.',
    'chapterStructure.meetingsInfo':
      'We hold membership meetings every month and steering committee meetings twice a month.',
  },

  'ud-ydsa.json': {
    'hero.subtitle': 'Building student power at the University of Delaware.',
    'campaignsSection.campaigns.0.description':
      'Fighting for affordable housing, meal plan reform, and lower costs for students.',
    'campaignsSection.campaigns.1.description':
      'Supporting campus workers through solidarity actions and fighting for better working conditions.',
    'campaignsSection.campaigns.2.description':
      'Pressuring the university to stop investing in fossil fuels and start using clean energy.',
    'joinSection.description':
      "We're building student power at the University of Delaware. Join us to fight for a better campus and a better world.",
  },

  'what-we-stand-for.json': {
    'hero.description':
      'Delaware DSA works to create a society built on community care, economic democracy, and social justice.',
    'corePrinciplesSection.principles.0.description':
      'We oppose an economic system driven only by private profit. We support an economy that serves everyone.',
    'corePrinciplesSection.principles.1.description':
      'We want a fair social order rooted in democratic socialism, feminism, and racial justice.',
    'corePrinciplesSection.principles.2.description':
      "We support trade unions, women's rights groups, civil rights organizations, and other groups fighting for justice.",
    'strategicGoalsSection.subtitle':
      "Three clear goals that guide our chapter's long-term organizing work.",
    'strategicGoalsSection.goals.0.description':
      "Build a visible, influential socialist presence in Delaware's political landscape.",
    'strategicGoalsSection.goals.1.description':
      "Challenge Delaware's role as a corporate tax haven and work to change these unfair policies.",
    'strategicGoalsSection.goals.2.description':
      'Foster a movement that can achieve democratic socialism in Delaware and beyond.',
    'democraticStructureSection.subtitle':
      'Democratic accountability through elected leadership and member control.',
    'democraticStructureSection.structure.0.description':
      'All dues-paying members can vote at meetings and help make decisions about our work.',
    'democraticStructureSection.structure.1.description':
      'Co-chairs, Secretary, Treasurer, and Membership Coordinator are elected by the membership.',
    'democraticStructureSection.structure.2.description':
      'Northern Branch covers New Castle County. Southern Branch covers Kent and Sussex Counties.',
    'organizationSection.subtitle':
      'Democratic participation through committees, working groups, and member involvement.',
    'organizationSection.organizationTypes.0.description':
      'Ongoing organizational work with elected co-chairs and regular meeting schedules.',
    'organizationSection.organizationTypes.1.description':
      'Issue-based and identity-based organizing around specific campaigns and community needs.',
    'organizationSection.participationInfo':
      'All members can join committees and working groups. Leadership positions are open to all members in good standing.',
    'aboutSection.content':
      'Delaware DSA is a local chapter of the Democratic Socialists of America. We organize for economic democracy and social justice.',
    'beliefs.principles.0.description':
      'We believe in democratic control of resources and production to serve human needs, not corporate profits.',
    'beliefs.principles.1.description':
      'Resources should be shared based on human need. This ensures everyone can live with dignity.',
    'beliefs.principles.2.description':
      'Real change happens when millions of working-class people organize together for their common interests.',
    'beliefs.principles.3.description':
      'We are a member-funded, member-run organization that fights for the interests of working people.',
    'platform.planks.0.description':
      'We work to end mass incarceration, abolish the death penalty, and reform our criminal justice system.',
    'platform.planks.1.description':
      'We fight for massive public investment in clean energy, green jobs, and environmental justice.',
    'platform.planks.2.description':
      'Housing is a human right. We organize for tenant protections, rent control, and public housing.',
    'platform.planks.3.description':
      'Healthcare is a human right. We support Medicare for All and universal healthcare coverage.',
    'priorities2025.priorities.0.description':
      'Working with immigrant rights groups to protect people from deportation and detention.',
    'priorities2025.priorities.1.description':
      'Building coalitions to reduce economic support for the state of Israel.',
    'priorities2025.priorities.2.description':
      'Fighting for tenant protections and promoting affordable housing through grassroots organizing.',
    'priorities2025.priorities.3.description':
      'Working to transform Delaware from a state that ignores trans people to one that actively protects their rights.',
    'cta.description':
      'If you share our vision for a more just, democratic, and sustainable world, we invite you to join us.',
  },
};

// Helper function to get nested object value
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object') {
      // Handle array indices
      if (!isNaN(parseInt(key))) {
        return current[parseInt(key)];
      }
      return current[key];
    }
    return undefined;
  }, obj);
}

// Helper function to set nested object value
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;

  for (const key of keys) {
    if (!isNaN(parseInt(key))) {
      // Handle array indices
      const index = parseInt(key);
      if (!Array.isArray(current)) {
        console.warn(
          `Expected array at path ${keys.join('.')}, found ${typeof current}`
        );
        return false;
      }
      current = current[index];
    } else {
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
  }

  if (!isNaN(parseInt(lastKey))) {
    const index = parseInt(lastKey);
    if (Array.isArray(current)) {
      current[index] = value;
    } else {
      console.warn(`Expected array at final path, found ${typeof current}`);
      return false;
    }
  } else {
    current[lastKey] = value;
  }
  return true;
}

// Function to calculate Flesch reading score
function calculateFleschScore(text) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.trim().length > 0);
  const syllables = words.reduce(
    (total, word) => total + countSyllables(word),
    0
  );

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  return 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
}

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function getGradeLevel(score) {
  if (score >= 90) return 'Grade 5';
  if (score >= 80) return 'Grade 6';
  if (score >= 70) return 'Grade 7';
  if (score >= 60) return 'Grade 8-9';
  if (score >= 50) return 'Grade 10-12';
  if (score >= 30) return 'College';
  return 'Graduate';
}

// Main function to apply readability fixes
function applyReadabilityFixes() {
  const contentDir = path.join(__dirname, '../src/core/content/pages');

  if (!fs.existsSync(contentDir)) {
    console.error(`Content directory not found: ${contentDir}`);
    console.error('Please run this script from the frontend directory');
    process.exit(1);
  }

  console.log('Applying readability fixes to Delaware DSA content...');
  console.log('==================================================\n');

  let totalReplacements = 0;
  let filesModified = 0;

  // Process each file that has replacements defined
  for (const [filename, fileReplacements] of Object.entries(replacements)) {
    const filePath = path.join(contentDir, filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filename}`);
      continue;
    }

    try {
      // Read and parse JSON file
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let fileModified = false;
      let fileReplacements = 0;

      console.log(`📝 Processing ${filename}...`);

      // Apply each replacement for this file
      for (const [path, newValue] of Object.entries(fileReplacements)) {
        const currentValue = getNestedValue(content, path);

        if (currentValue === undefined) {
          console.warn(`  ⚠️  Path not found: ${path}`);
          continue;
        }

        if (currentValue === newValue) {
          console.log(`  ✅ ${path} (already up to date)`);
          continue;
        }

        // Calculate readability scores for comparison
        const oldScore = calculateFleschScore(currentValue);
        const newScore = calculateFleschScore(newValue);
        const oldGrade = getGradeLevel(oldScore);
        const newGrade = getGradeLevel(newScore);

        // Set the new value
        if (setNestedValue(content, path, newValue)) {
          console.log(`  ✅ ${path}`);
          console.log(
            `     Old: ${oldScore.toFixed(1)} (${oldGrade}) → New: ${newScore.toFixed(1)} (${newGrade})`
          );
          fileModified = true;
          fileReplacements++;
          totalReplacements++;
        } else {
          console.error(`  ❌ Failed to set ${path}`);
        }
      }

      // Write the updated content back to file
      if (fileModified) {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
        console.log(`  💾 Saved ${fileReplacements} changes to ${filename}\n`);
        filesModified++;
      } else {
        console.log(`  ℹ️  No changes needed for ${filename}\n`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filename}:`, error.message);
    }
  }

  console.log('Summary');
  console.log('=======');
  console.log(`Files modified: ${filesModified}`);
  console.log(`Total replacements: ${totalReplacements}`);

  if (totalReplacements > 0) {
    console.log('\n🎉 Readability fixes applied successfully!');
    console.log('💡 Run `npm run check-readability` to verify improvements');
  } else {
    console.log('\nℹ️  All content was already up to date');
  }
}

// Run the script
if (require.main === module) {
  applyReadabilityFixes();
}

module.exports = { applyReadabilityFixes };
