import React from 'react';

const Feature = () => {
  return (
      <div className="mt-16 bg-gray-100 py-16 px-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/server.png" // Replace with your icon
              alt="Resource Optimization"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg">Resource Optimization</h3>
            <p className="mt-2 text-gray-600">
              Automatically optimize your cloud resources for cost and performance.
            </p>
          </div>
          <div>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/security-checked.png" // Replace with your icon
              alt="Enhanced Security"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg">Enhanced Security</h3>
            <p className="mt-2 text-gray-600">
              Implement robust security measures to protect your cloud infrastructure.
            </p>
          </div>
          <div>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/combo-chart.png" // Replace with your icon
              alt="Real-time Monitoring"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg">Real-time Monitoring</h3>
            <p className="mt-2 text-gray-600">
              Get instant insights into your cloud performance and usage.
            </p>
          </div>
        </div>
      </div>

  );
};

export default Feature;
