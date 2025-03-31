import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Pages
import ForgetPassword from './app/auth/forget-password/Forgetpassword';
import Login from './app/auth/login/Login';
import SignUpBusiness from './app/auth/sign-up/business/SignUp';
import SignUpFreelancer from './app/auth/sign-up/freelancer/SignupFreelancer';

// Bid Management
import BidManagement from './app/bidmanagement/BidManagement';

// Business Pages
import AddProject from './app/business/addProject';
import FreelancerProfile from './app/business/freelancerProfile';
import BusinessMarket from './app/business/market/market';
import MarketAccepted from './app/business/market/accepted';
import MarketInvited from './app/business/market/invited';
import MarketRejected from './app/business/market/rejected';
import BusinessProject from './app/business/project/project';
import BusinessMilestone from './app/business/project/milestone';
import BusinessSettingsInfo from './app/business/settings/business-info';
import BusinessKYC from './app/business/settings/kyc';
import BusinessTalent from './app/business/talent';

// Chat
import Chat from './app/chat/chat';

// Consultancy
import ConsultancyFreelancer from './app/consultancy/freelancer';

// Dashboard Pages
import BusinessTalentDashboard from './app/dashboard/businessTalentDashboard';
import FreelancerDashboard from './app/dashboard/freelancerDashboard';

// Freelancer Pages
import FreelancerInfo from './app/freelancer/FreelancerInfo';
import BusinessProfile from './app/freelancer/businessProfile';
import InterviewBids from './app/freelancer/interview/bids';
import InterviewCurrent from './app/freelancer/interview/current';
import InterviewHistory from './app/freelancer/interview/history';
import InterviewProfile from './app/freelancer/interview/profile';
import FreelancerMarket from './app/freelancer/market/market';
import FreelancerMarketBusiness from './app/freelancer/market/marketBusiness';
import OracleBusinessVerification from './app/freelancer/oracleDashboard/businessVerification';
import OracleEducationVerification from './app/freelancer/oracleDashboard/educationVerification';
import OracleProjectVerification from './app/freelancer/oracleDashboard/projectVerification';
import FreelancerProject from './app/freelancer/project/project';
import FreelancerMilestone from './app/freelancer/project/milestone';
import ProjectApplied from './app/freelancer/project/applied';
import ProjectCompleted from './app/freelancer/project/completed';
import ProjectCurrent from './app/freelancer/project/current';
import ProjectRejected from './app/freelancer/project/rejected';
import ScheduleInterview from './app/freelancer/scheduleInterview';
import EducationInfo from './app/freelancer/settings/educationInfo';
import FreelancerKYC from './app/freelancer/settings/kyc';
import PersonalInfo from './app/freelancer/settings/personalInfo';
import ProfessionalInfo from './app/freelancer/settings/professionalInfo';
import FreelancerTalent from './app/freelancer/talent';

// Home Pages
import About from './app/home/about';
import Footer from './app/home/footer';
import Testimonial from './app/home/testimonal';

// Market Freelancer Project
import MarketFreelancerProject from './app/market/freelancer/project';

// Notes Pages
import Notes from './app/notes/notes';
import NotesArchive from './app/notes/archive';
import NotesTrash from './app/notes/trash';

// Privacy and Profile
import Privacy from './app/privacy/Privacy';
import Profile from './app/profile/Profile';

// Settings
import Support from './app/settings/support';

// Layout and Homepage
import Layout from './app/layout';
import Homepage from './app/homepage';
import NotFound from './app/not-found';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Root Route */}
          <Route index element={<Homepage />} />

          {/* Auth Routes */}
          <Route path="auth">
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up">
              <Route path="business" element={<SignUpBusiness />} />
              <Route path="freelancer" element={<SignUpFreelancer />} />
            </Route>
          </Route>

          {/* Bid Management */}
          <Route path="bidmanagement" element={<BidManagement />} />

          {/* Business Routes */}
          <Route path="business">
            <Route path="addProject" element={<AddProject />} />
            <Route path="freelancerProfile" element={<FreelancerProfile />} />
            <Route path="market">
              <Route index element={<BusinessMarket />} />
              <Route path="accepted" element={<MarketAccepted />} />
              <Route path="invited" element={<MarketInvited />} />
              <Route path="rejected" element={<MarketRejected />} />
            </Route>
            <Route path="project">
              <Route index element={<BusinessProject />} />
              <Route path="milestone" element={<BusinessMilestone />} />
            </Route>
            <Route path="settings">
              <Route path="business-info" element={<BusinessSettingsInfo />} />
              <Route path="kyc" element={<BusinessKYC />} />
            </Route>
            <Route path="talent" element={<BusinessTalent />} />
          </Route>

          {/* Chat */}
          <Route path="chat" element={<Chat />} />

          {/* Consultancy */}
          <Route path="consultancy">
            <Route path="freelancer" element={<ConsultancyFreelancer />} />
          </Route>

          {/* Dashboard Routes */}
          <Route path="dashboard">
            <Route path="businessTalentDashboard" element={<BusinessTalentDashboard />} />
            <Route path="freelancerDashboard" element={<FreelancerDashboard />} />
          </Route>

          {/* Freelancer Routes */}
          <Route path="freelancer">
            <Route path="FreelancerInfo" element={<FreelancerInfo />} />
            <Route path="businessProfile" element={<BusinessProfile />} />
            <Route path="interview">
              <Route path="bids" element={<InterviewBids />} />
              <Route path="current" element={<InterviewCurrent />} />
              <Route path="history" element={<InterviewHistory />} />
              <Route path="profile" element={<InterviewProfile />} />
            </Route>
            <Route path="market">
              <Route index element={<FreelancerMarket />} />
              <Route path="marketBusiness" element={<FreelancerMarketBusiness />} />
            </Route>
            <Route path="oracleDashboard">
              <Route path="businessVerification" element={<OracleBusinessVerification />} />
              <Route path="educationVerification" element={<OracleEducationVerification />} />
              <Route path="projectVerification" element={<OracleProjectVerification />} />
            </Route>
            <Route path="project">
              <Route index element={<FreelancerProject />} />
              <Route path="milestone" element={<FreelancerMilestone />} />
              <Route path="applied" element={<ProjectApplied />} />
              <Route path="completed" element={<ProjectCompleted />} />
              <Route path="current" element={<ProjectCurrent />} />
              <Route path="rejected" element={<ProjectRejected />} />
            </Route>
            <Route path="scheduleInterview" element={<ScheduleInterview />} />
            <Route path="settings">
              <Route path="educationInfo" element={<EducationInfo />} />
              <Route path="kyc" element={<FreelancerKYC />} />
              <Route path="personalInfo" element={<PersonalInfo />} />
              <Route path="professionalInfo" element={<ProfessionalInfo />} />
            </Route>
            <Route path="talent" element={<FreelancerTalent />} />
          </Route>

          {/* Home Routes */}
          <Route path="home">
            <Route path="about" element={<About />} />
            <Route path="footer" element={<Footer />} />
            <Route path="testimonal" element={<Testimonial />} />
          </Route>

          {/* Market Freelancer Project */}
          <Route path="market/freelancer/project" element={<MarketFreelancerProject />} />

          {/* Notes Routes */}
          <Route path="notes">
            <Route index element={<Notes />} />
            <Route path="archive" element={<NotesArchive />} />
            <Route path="trash" element={<NotesTrash />} />
          </Route>

          {/* Privacy and Profile */}
          <Route path="privacy" element={<Privacy />} />
          <Route path="profile" element={<Profile />} />

          {/* Settings */}
          <Route path="settings">
            <Route path="support" element={<Support />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;