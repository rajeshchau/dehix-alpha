import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Separator } from '@/components/ui/separator';

export const ResumePreview1 = ({
  educationData = [],
  workExperienceData = [],
  personalData = [],
  projectData = [],
  skillData = [],
  achievementData = [],
  summaryData = [],
  headingColor = '#1A73E8',
}) => {
  const containerRef = useRef(null);

  return (
    <div className="flex justify-center w-full h-full py-10 ">
      <div
        ref={containerRef}
        className="bg-white w-[900px] p-10 shadow-lg flex flex-col rounded-md border border-gray-300"
        style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="w-full text-center">
          {personalData.map((person, index) => (
            <div key={index} className="mb-4">
              <h1
                className="text-2xl font-bold"
                style={{ color: headingColor }}
              >
                {`${person.firstName} ${person.lastName}`}
              </h1>
              <p className="text-sm text-gray-600">
                {person.email} • {person.phoneNumber}
              </p>
              <p className="text-sm text-gray-600">
                {person.github} • {person.linkedin}
              </p>
            </div>
          ))}
        </div>

        <Separator className="border-gray-300" />
        {summaryData.length > 0 && (
          <div className="mt-4">
            <h2
              className="text-lg font-semibold text-blue-800"
              style={{ color: headingColor }}
            >
              Summary
            </h2>
            <Separator className="mb-2" />
            <p className="text-sm text-gray-600 leading-relaxed">
              {summaryData.join(' ')}
            </p>
          </div>
        )}

        <Separator className="border-gray-300" />
        {workExperienceData.length > 0 && (
          <div className="mt-4">
            <h2
              className="text-lg font-semibold text-blue-800"
              style={{ color: headingColor }}
            >
              Work Experience
            </h2>
            <Separator className="mb-2" />
            {workExperienceData.map((item, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm font-medium text-black">
                  {item.jobTitle} - {item.company}
                </p>
                <p className="text-xs text-gray-500">
                  {item.startDate} to {item.endDate}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <Separator className="border-gray-300" />
        {educationData.length > 0 && (
          <div className="mt-4">
            <h2
              className="text-lg font-semibold text-blue-800"
              style={{ color: headingColor }}
            >
              Education
            </h2>
            <Separator className="mb-2" />
            {educationData.map((item, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm font-medium text-black">
                  {item.degree} - {item.school}
                </p>
                <p className="text-xs text-gray-500">
                  {item.startDate} to {item.endDate}
                </p>
              </div>
            ))}
          </div>
        )}

        <Separator className="border-gray-300" />
        {projectData.length > 0 && (
          <div className="mt-4">
            <h2
              className="text-lg font-semibold text-blue-800"
              style={{ color: headingColor }}
            >
              Projects
            </h2>
            <Separator className="mb-2" />
            {projectData.map((project, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm font-medium text-black">
                  {project.title}
                </p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        <Separator className="border-gray-300" />
        {skillData.length > 0 && (
          <div className="mt-4">
            <h2
              className="text-lg font-semibold text-blue-800"
              style={{ color: headingColor }}
            >
              Skills
            </h2>
            <Separator className="mb-2" />
            <ul className="list-disc list-inside text-sm text-gray-600">
              {skillData.map((skill, index) => (
                <li key={index}>{skill.skillName}</li>
              ))}
            </ul>
          </div>
        )}

        <Separator className="border-gray-300" />
        {achievementData.length > 0 && (
          <div className="mt-4">
            <h2
              className="text-lg font-semibold text-blue-800"
              style={{ color: headingColor }}
            >
              Achievements
            </h2>
            <Separator className="mb-2" />
            <ul className="list-disc list-inside text-sm text-gray-600">
              {achievementData.map((achievement, index) => (
                <li key={index}>{achievement.achievementName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

ResumePreview1.propTypes = {
  educationData: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ),
  workExperienceData: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  personalData: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      github: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
    })
  ),
  projectData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  skillData: PropTypes.arrayOf(
    PropTypes.shape({
      skillName: PropTypes.string.isRequired,
    })
  ),
  achievementData: PropTypes.arrayOf(
    PropTypes.shape({
      achievementName: PropTypes.string.isRequired,
    })
  ),
  summaryData: PropTypes.arrayOf(PropTypes.string),
  headingColor: PropTypes.string,
};

export default ResumePreview1;